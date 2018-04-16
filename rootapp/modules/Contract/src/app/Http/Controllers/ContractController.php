<?php

namespace Contract\App\Http\Controllers;


use Carbon\Carbon;
use Contract\App\Http\Requests\ContractForm;
use Contract\App\Models\Contract;
use Contract\App\Repositories\ContractRepository;
use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller as BaseController;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Supports\Result;
use KielPack\LaraLibs\Traits\PaginationTrait;


class ContractController extends BaseController
{

    use PaginationTrait;

    private $contractRepo;

    const DEFAULT_PERIOD = 12;
    const DEFAULT_EXPIRED_PERIOD = 3;

    public function __construct(ContractRepository $repository)
    {
        $this->contractRepo = $repository;
    }

    public function index(Request $request) {

        return view('contract.index');
    }


    public function apiGetList(Request $request)
    {
        try {

            $search = [
                "state" =>  $request->get('state','pending'),
                "key"   =>  $request->get('key',null),
                "value" =>  $request->get('value',null)
            ];

            //get contracts
            $contracts = Contract::getContracts($search);

            $contractList = $this->createPagination($contracts, function ($row) {
                    $item = [
                        "id" => $row->id,
                        "contract_no" => $row->contract_no,
                        "villa_no" => $row->villa_no,
                        "full_name" => $row->full_name,
                        "created_at" => Carbon::parse($row->contract_created)->format('d, M, Y'),
                        "period" => Carbon::parse($row->period_start)->format('d, M, Y') ." - ". Carbon::parse($row->period_end_extended)->format('d, M, Y'),
                        "amount" => number_format($row->amount,2),
                        "bill_no" => $row->bill_no,
                        "status" => ucfirst($row->contracts_status)
                    ];

                    return $item;
            },$search);

            return Result::response($contractList);

        }
        catch (Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiCreate()
    {
        try {

            $outputs = array();
            $data = $this->contractRepo->create(self::DEFAULT_PERIOD);
            $lookups = Selection::getSelections(["contract_type","tenant_type","villa_location","bank"]);

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

            $contract = $this->contractRepo->saveContract($inputs);

            $bundle->clearAll();
            $bundleValue = ['id' => $contract->villa_id,'status' => 'occupied'];
            $bundle->add('villa', $bundleValue);

            event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus"])));

            return Result::ok("Successfully save!!", ["id" => $contract->contract_no]);
        }
        catch (Exception $e) {
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

            //check if amount balance
            $amountBalance = $oldContract->getRemainingBalance();
            if ($amountBalance > 0) {
                throw new Exception('Unable to renew. Contract has a pending balance');
            }

            //recalculate the past contract period
            //$remainingPeriodDay = $oldContract->getRemainingPeriod();

            //display contract
            $oldContract->setDefaultPeriod(\Carbon\Carbon::parse($oldContract->period_end), self::DEFAULT_PERIOD);
            //extra
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

            $contract = $this->contractRepo->terminate($inputs);

            //terminate the contract
            if ($contract->isTerminated()) {
                //update villa event
                $bundle = new Bundle();
                $bundleValue = ["id" => $contract->villa()->first()->id, "status" => "vacant"];

                $bundle->add("villa", $bundleValue);
                $bundle->add('contract', $contract);
                $bundle->add('user', $user);

                event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus","UpdatePayment"])));

                return Result::ok('Succefully terminated!!!');
            } else {
                throw new Exception('Contract failed to terminate');
            }
        } catch (Exception $e) {
            return Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    



}