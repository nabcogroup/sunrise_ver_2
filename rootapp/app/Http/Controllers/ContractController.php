<?php

namespace App\Http\Controllers;

use App\Events\NotifyUpdate;
use App\Events\OnCalculation;
use App\Events\OnCreating;
use App\Http\Requests\ContractCalcForm;
use App\Http\Requests\ContractForm;
use App\Http\Requests\RenewalForm;
use App\Repositories\ContractRepository;
use App\Selection;
use App\Services\Bundle;
use App\Services\EventListenerRegister;
use App\Services\Result;
use Carbon\Carbon;
use Dompdf\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function index() {
        return view('contract.index');
    }

    public function show($id) {
        try {

            $contract = $this->contractRepo->find($id);

            if ($contract) {
                $billNo = $contract->bill()->first()->bill_no;
                return redirect()->route("bill.show", $billNo);
            }
            else {
                throw new Exception("Contract not found");
            }
        }
        catch(Exception $e) {
            return Result::badRequestWeb($e);
        }
    }


    public function register() {
        return view("contract.register");
    }

    public function calendar() {
        return view("contract.calendar");
    }

    public function apiCalendar(Request $request) {
        
        try {
            $periods = $request->all();
            $contracts = $this->contractRepo->includeAssociates()->activeOnly()->getExpiryContracts(Carbon::parse($periods['start']), Carbon::parse($periods['end']))->get();
            $events = array();

            if($contracts) {

                foreach($contracts as $contract) {
                    $event = [ 
                        "id"            =>  $contract->getId(),
                        "contract_no"   =>  $contract->contract_no,
                        "villa_no"      =>  $contract->villa()->first()->villa_no,
                        "tenant_name"   =>  $contract->tenant()->first()->full_name,
                        "period"        =>  ["start" => $contract->period_start, "end" => $contract->period_end],
                        "title"         =>  $contract->villa()->first()->villa_no ." - ".$contract->tenant()->first()->full_name,
                        "start"         =>  Carbon::parse($contract["period_end"])->subDays(self::DEFAULT_EXPIRED_PERIOD)->toDateString(),
                        "end"           =>  Carbon::parse($contract["period_end"])->toDateString(),
                        "canRenew"      =>  true,
                    ];

                    array_push($events,$event);
                }
            }

            return $events;
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    
    }

    public function apiGetList($status = 'pending') {
        try {

            //make sure contract with current user
            $userId = Auth::user()->getAuthIdentifier();

            //get user contracts
            $contracts = $this->contractRepo->ownedBy($userId)->getContracts($status);


            return $contracts;
        }
        catch(Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCreate() {
        try {

            $outputs = array();
            $data = $this->contractRepo->create(self::DEFAULT_PERIOD);
            $lookups = $this->selections->getSelections(["contract_type","tenant_type"]);

            return compact("data","lookups");

        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiRecalc(ContractCalcForm $request) {

        $inputs = $request->filterInput();

        try {

            //fire event
            $bundle = new Bundle();
            $bundle->add("villaId", $inputs['villa_id']);
            event(new OnCalculation($bundle, new EventListenerRegister(["GetVillaOnRecalculate"])));
            $villaOutput = $bundle->getOutput('villa');
            if ($villaOutput != null) {
                //get the rate
                $ratePerMonth = $villaOutput->rate_per_month;
                //create contract with new rate
                $contract = $this->contractRepo->create(self::DEFAULT_PERIOD);
                $contract->setPeriod($inputs['period_start'], $inputs['period_end']);
                $contract->toComputeAmount($ratePerMonth);
                return $contract;
            }
            else {
                throw new Exception("No contract was created");
            }
        }
        catch(Exception $e) {
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

            if(!$bundle->hasOutput()) {
                throw new Exception("Internal Error");
            }

            $tenantOutput = $bundle->getOutput('tenant');
            $villaOutput = $bundle->getOutput('villa');

            //remove tenant
            unset($inputs['register_tenant']);

            //temp manually add user id
            $userId = Auth::user()->getAuthIdentifier();

            $inputs['tenant_id'] = $tenantOutput->id;
            $inputs['villa_no']  = $villaOutput->villa_no;

            $contract = $this->contractRepo->saveContract($inputs,$userId);
            $bundle->clearAll();

            $bundleValue = ['id' => $contract->villa_id,'status' => 'occupied'];
            $bundle->add('villa',$bundleValue);

            event(new NotifyUpdate($bundle,new EventListenerRegister(["UpdateVillaStatus"])));

            return Result::ok("Successfully save!!",["id" => $contract->contract_no]);

        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCancel(Request $request) {
        try {

            $contract = $this->contractRepo->find($request->input('id'));
            if($contract->isPending()) {
                
                $tenantId = $contract->tenant_id;
                $villaId = $contract->villa_id;

                //cancel and delete
                $contract->delete();

                $bundle = new Bundle();

                $bundleValue = ["id" => $villaId, "status" => "vacant"];

                $bundle->add("villa",$bundleValue);

                event(new NotifyUpdate($bundle,new EventListenerRegister(["UpdateVillaStatus"])));

                return Result::ok('Succefully cancelled!!!');

            }
            else {
                throw new Exception("Unable to cancel the contract");
            }
        }
        catch(Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiRenew($id) {

        try {
            //get the old contract including villa
            $oldContract = $this->contractRepo->includeAssociates()->find($id);

            //make sure the contract is active
            if(!$oldContract->isActive()) {
                throw new Exception('Contract is not active');
            }
            
            //check if amount balance 
            $amountBalance = $oldContract->getRemainingBalance();
            if($amountBalance > 0) {
                throw new Exception('Unable to renew. Contract has a pending balance');
            }

            //recalculate the past contract period
            $remainingPeriodDay = $oldContract->getRemainingPeriod();

            //display contract
            $oldContract->setDefaultPeriod(Carbon::now(),self::DEFAULT_PERIOD,$remainingPeriodDay);

            return $oldContract;
        }
        catch(Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiUpdate(RenewalForm $renewal) {
        
        try {

            $entity = $renewal->filterInput();
            $oldContract = $this->contractRepo->find($entity['id']);

            if($oldContract) {
                //make sure the contract is active
                if(!$oldContract->isActive()) {
                    throw new Exception('Contract is not active');
                }
            
                //check if amount balance 
                $amountBalance = $oldContract->getRemainingBalance();
                if($amountBalance > 0) {
                    throw new Exception('Unable to renew. Contract has a pending balance');
                }


                $bundle = new Bundle();
                $villaId = $oldContract->villa_id;
                $bundle->add('villaId',$villaId);
                
                event(new OnCreating($bundle, new EventListenerRegister(["GetVilla"])));
                
                $villaOutput = $bundle->getOutput('villa');
                if($villaOutput != null) {

                    $entity['id'] = 0; //make new
                    $entity['villa_no'] = $villaOutput->villa_no;
                    $entity['villa_id'] = $villaOutput->getId();
                    $entity['tenant_id'] = $oldContract->tenant_id;
                    $entity['contract_type'] = $oldContract->contract_type;
                    $userId = Auth::user()->getAuthIdentifier(); //manually user
                    $newContract = $this->contractRepo->saveContract($entity,$userId);
                    
                    //make the old contract complete
                    $oldContract->completed()->save();
                }
            }

            return Result::ok("Successfully update!!!",["id" => $newContract->contract_no]);
        }
        catch(Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiTerminate(Request $request) {

        $id = $request->input('id');
        
    }



}
