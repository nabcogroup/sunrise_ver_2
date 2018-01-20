<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use App\User;
use Carbon\Carbon;
use App\Selection;


use App\Events\Verify;
use App\Events\OnCreating;
use App\Events\NotifyUpdate;

use Illuminate\Http\Request;

use App\Events\OnCalculation;
use App\Http\Requests\RenewalForm;
use App\Http\Requests\ContractForm;

use App\Services\Bundle;
use App\Services\EventListenerRegister;
use App\Services\Result;

use App\Http\Requests\TerminateForm;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ContractCalcForm;
use App\Repositories\ContractRepository;
use Mockery\Exception;


class ContractController extends Controller
{

    private $contractRepo;

    const DEFAULT_PERIOD = 12;
    const DEFAULT_EXPIRED_PERIOD = 3;

    public function __construct(ContractRepository $repository)
    {
        $this->contractRepo = $repository;

        $this->selections = new Selection();

    }

    public function index()
    {

        return view('contract.index');
    }

    public function show($id)
    {
        try {

            if ($contract = $this->contractRepo->find($id)) {
                $billNo = $contract->bill()->first()->bill_no;
                return redirect()->route("bill.show", $billNo);
            } 
            else {
                throw new Exception("Contract not found");
            }
        } catch (Exception $e) {
            return Result::badRequestWeb($e);
        }
    }

    public function register()
    {

        //check if the has a vacant villa
        //if not redirect back to list
        $bundle = new Bundle();

        event(new Verify($bundle, new EventListenerRegister(["VerifyVillaVacancy"])));
        
        $count = $bundle->getOutput("count");
       
        if ($count == 0) {
            return redirect()->route('contract.manage');
        }

        return view("contract.register");
    }

    public function calendar()
    {

        return view("contract.calendar");

    }

    public function apiUpdateExtended()
    {
        $contracts = \App\Contract::all();

        foreach ($contracts as $contract) {

            $contract->period_end_extended = Carbon::parse($contract->period_end)->addDays($contract->extra_days);

            $contract->save();

        }

        return Result::ok("Successful");
    }

    public function apiCalendar(Request $request)
    {   
        try {

            $periods = $request->all();

            $expiryContracts = $this->contractRepo->getExpiryContracts($periods['start'],$periods['end'])->get();

            $args = [
                "model"         =>  "contract",
                "base_period"   =>  "period_end_extended",
                "grace_period"  =>  "3"
            ];

            $eventCalendar = new CalendarService($expiryContracts,$args);

            $eventCalendar->create(function($collection,&$event) {
                    $event["title"] = $collection->villa()->first()->villa_no ." - ".$collection->tenant()->first()->full_name;
                    $event["id"]    = $collection->getId();
                    $event["full_name"]   =  $collection->tenant()->first()->full_name;
                    $event["contract_no"]   =  $collection->contract_no;
            });

            return $eventCalendar->getEvents();

        } catch (Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiGetList(Request $request, $status = 'pending')
    {
        try {

            //get user contract
            $contracts = $this->contractRepo->getContracts($status, $request->input('filter_field'), $request->input('filter_value'));
            

            //evaluate contract pending
            return $contracts;

        } catch (Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCreate()
    {
        try {

            $outputs = array();
            $data = $this->contractRepo->create(self::DEFAULT_PERIOD);

            //extra
            $data->prep_series = 1;
            $data->prep_bank = "";
            $data->prep_due_date = "";
            $data->prep_ref_no = "";

            $lookups = $this->selections->getSelections(["contract_type","tenant_type","villa_location","bank"]);
            $lookups["due_date"] = [
                [
                    "value" => "1",
                    "text" => "Every 1st Day"
                ],
                [
                    "value" => "15",
                    "text" => "Every 15 Days"
                ],
                [
                    "value" => "30",
                    "text" => "Every 30 Days"
                ],
            ];

            return compact("data", "lookups");
        } catch (Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiRecalc(ContractCalcForm $request)
    {

        $inputs = $request->filterInput();

        try {

            $ratePerMonth = floatval($inputs["custom_rate"]);

            //check if there is a custom calculation

            if ($ratePerMonth == 0) {

                //fire event
                $bundle = new Bundle();

                $bundle->add("villaId", $inputs['villa_id']);

                event(new OnCalculation($bundle, new EventListenerRegister(["GetVillaOnRecalculate"])));

                $villaOutput = $bundle->getOutput('villa');

                if ($villaOutput != null) {

                    $ratePerMonth = $villaOutput->rate_per_month;

                }
            }

            //create contract with new rate
            $contract = $this->contractRepo->create(self::DEFAULT_PERIOD);

            $contract->rate_per_month = $ratePerMonth;


            $contract->setPeriod($inputs['period_start'], $inputs['period_end']);

            $contract->toComputeAmount($ratePerMonth);

            return $contract;

        }
        catch (Exception $e) {

            return Result::badRequest(["message" => $e->getMessage()]);

        }
    }

    public function apiStore(ContractForm $request) {

        $inputs = $request->filterInput();


        try {

            $bundle = new Bundle();

            $bundle->add('tenant', $inputs['register_tenant']);
            $bundle->add('villaId', $inputs['villa_id']);

            event(new OnCreating($bundle, new EventListenerRegister(["GetVilla", "CreateTenant"])));

            if (!$bundle->hasOutput()) {

                throw new Exception("Internal Error");

            }

            $tenantOutput = $bundle->getOutput('tenant');

            $villaOutput = $bundle->getOutput('villa');

            //remove tenant
            unset($inputs['register_tenant']);

            $inputs['tenant_id'] = $tenantOutput->id;
            $inputs['villa_no']  = $villaOutput->villa_no;

            if($inputs["rate_per_month"]) {
                unset($inputs["rate_per_month"]);
            }

            $contract = $this->contractRepo->saveContract($inputs);

            $bundle->clearAll();
            $bundleValue = ['id' => $contract->villa_id,'status' => 'occupied'];
            $bundle->add('villa', $bundleValue);

            event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus"])));

            return Result::ok("Successfully save!!", ["id" => $contract->contract_no]);
        } catch (Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCancel(Request $request)
    {
        try {


            $contract = $this->contractRepo->find($request->input('id'));

            if ($contract->isPending()) {
                
                $tenantId = $contract->tenant_id;

                $villaId = $contract->villa_id;

                $contract->cancel();
                $contract->save();
                //cancel and delete
                $contract->delete();

                $bundle = new Bundle();
                $bundleValue = ["id" => $villaId, "status" => "vacant"];
                $bundle->add("villa", $bundleValue);

                event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus"])));

                return Result::ok('Succefully cancelled!!!');

            } else {
                throw new Exception("Unable to cancel the contract");
            }
        } catch (Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiRenew($id)
    {

        try {
            //get the old contract including villa
            $oldContract = $this->contractRepo->includeAssociates()->find($id);

            //make sure the contract is active
            if (!$oldContract->isActive()) {
                throw new Exception('Contract is not active');
            }


            //check payment  receivables
            $amountReceivables = $oldContract->bill()->first()->withPendingPayments()->sum('amount');

            if ($amountReceivables > 0) {
                throw new Exception('Unable to renew. Contract has a pending balance');
            }

            //recalculate the past contract period
            //$remainingPeriodDay = $oldContract->getRemainingPeriod();

            //display contract
            $oldContract->setDefaultPeriod(\Carbon\Carbon::parse($oldContract->period_end), self::DEFAULT_PERIOD);
            //extras
            $oldContract->prep_series = 1;
            $oldContract->prep_bank = "";
            $oldContract->prep_due_date = "";
            $oldContract->prep_ref_no = "";
            $lookups = $this->selections->getSelections(["contract_type","bank"]);
            $lookups["due_date"] = [
                 [
                     "value" => "1",
                     "text" => "Every 1st Day"
                 ],
                 [
                     "value" => "15",
                     "text" => "Every 15 Days"
                 ],
                 [
                     "value" => "30",
                     "text" => "Every 30 Days"
                 ],
             ];
             return compact("oldContract","lookups");
        } 
        catch (Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiUpdate(RenewalForm $renewal) {
        
        try {

            $entity = $renewal->filterInput();
            
            $oldContract = $this->contractRepo->find($entity['id']);
            if ($oldContract) {
                //make sure the contract is active
                if (!$oldContract->isActive()) {
                    throw new Exception('Contract is not active');
                }
            
                //check if amount balance
                $amountBalance = $oldContract->getRemainingBalance();
                if ($amountBalance > 0) {
                    throw new Exception('Unable to renew. Contract has a pending balance');
                }

                $bundle = new Bundle();
                $villaId = $oldContract->villa_id;
                $bundle->add('villaId', $villaId);
                event(new OnCreating($bundle, new EventListenerRegister(["GetVilla"])));
                
                $villaOutput = $bundle->getOutput('villa');
                if ($villaOutput != null) {
                    
                    $entity['id'] = 0; //make new
                    $entity['villa_no'] = $villaOutput->villa_no;
                    $entity['villa_id'] = $villaOutput->getId();
                    $entity['tenant_id'] = $oldContract->tenant_id;
                    $entity['contract_type'] = $entity['contract_type'];
                    
                    
                    $newContract = $this->contractRepo->saveContract($entity);
                    
                    //make the old contract complete
                    $oldContract->completed()->save();
                }
            }

            return Result::ok("Successfully update!!!", ["id" => $newContract->contract_no]);
        } catch (Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiTerminate(TerminateForm $request)
    {

        try {

            $inputs = $request->all();
            
            //validate password
            $userId = Auth::user()->getAuthIdentifier();

            $user = User::find($userId);
            
            //verify password
            if (!$user->isPasswordMatch($inputs['password'])) {
                throw new Exception('Password does not match');
            }


            $contract = $this->contractRepo->find($inputs["id"]);

            $bundle = new Bundle();

            $bundle->add("contract",$contract);

            //trigger event to check on the accounts
            event(new Verify($bundle,new EventListenerRegister(["VerifyOutstandingBalance"])));

            $contract = $this->contractRepo->terminate($inputs);

            //terminate the contract
            if ($contract->isTerminated()) {

                    //update villa event
                    $bundle = new Bundle();

                    $bundleValue = ["id" => $contract->villa()->first()->id, "status" => "vacant"];
                    $bundle->add("villa", $bundleValue);
                    $bundle->add('user', $user);

                    event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus"])));
            }
            else {
                throw new Exception('Contract failed to terminate');
            }

            return Result::ok('Succefully terminated!!!');

        }
        catch (Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }
    
}
