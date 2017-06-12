<?php

namespace App\Http\Controllers;

use App\Events\NotifyUpdate;
use App\Events\OnGetContract;
use App\Http\Requests\BillForm;
use App\Listeners\GetContract;
use App\Repositories\BillRepository;
use App\Selection;
use App\Services\Bundle;
use App\Services\EventListenerRegister;
use App\Services\Result;
use Dompdf\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use PDF;

class ContractBillController extends Controller
{

    private $billRepository;
    private $selection;

    public function __construct(BillRepository $repository)
    {

        $this->billRepository = $repository;
        $this->selection = new Selection();

    }

    public function create($contractNo) {

        $contract = $this->billRepository->findExistingContract($contractNo);
        $isSaved = false;
        $billNo = "";
        
        if(!empty($contract)) {
           $isSaved = true;
           $billNo = $contract->bill_no;
        }

        return view("bill.create",compact("contractNo","billNo"));
    }

    public function apiCreate($contractNo) {
        try {

            //get the contract
            $bundle = new Bundle();
            $bundle->add("contractNo", $contractNo);
            event(new OnGetContract($bundle, new EventListenerRegister(["GetContract"])));

            if(!$bundle->hasOutput()) {
                throw new Exception("Internal Error");
            }

            $contract = $bundle->getOutput("contract");

            //create bill instance
            $bill = $this->billRepository->create($contract->getId());
            $bill->instance->amount = $contract->payable_per_month;

            $lookups = $this->selection->getSelections(array("payment_mode","payment_term","payment_status"));

            //create payment summary
            $paymentSummary = [
                "total_payment" => 0,
                "total_cost" => $contract->amount
            ];

            //return bill and contract
            return compact("bill","contract","lookups","paymentSummary");

        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiStore(BillForm $request) {

        $inputs = $request->filterInput();

        try {

            $bundle = new Bundle();
            $bundle->add("contractId",$inputs['contract_id']);
            
            event(new OnGetContract($bundle,new EventListenerRegister(["GetContract"])));

            if(!$bundle->hasOutput()) {
                throw new Exception("Internal Error");
            }

            $contract = $bundle->getOutput("contract");

            //is there any balance still
            if($this->billRepository->hasBalance($inputs,$contract->amount)) {
                throw new Exception('Total payment amount is insufficient');
            }

            $bill = $this->billRepository->saveBill($inputs,Auth::user()->getAuthIdentifier())->instance();

            $bundle = new Bundle();
            $bundle->add('contractId',$inputs['contract_id']);
            $bundle->add('contract',$contract);

            //notify update
            event(new NotifyUpdate($bundle,new EventListenerRegister(["UpdateContractStatus","EmailNewContract"])));

            return Result::ok('Successfully Save',["billNo" => $bill->bill_no]);
        }
        catch (Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function show($billNo) {
        //show
        try {

            $bill = $this->billRepository->includePayments()->findByBillNo($billNo)->first();
            if(!$bill) {
                throw new Exception("Internal Exception");
            }
            $payments = [
                'clear' => $bill->payments()->where('status', 'clear')
            ];

            $bundle = new Bundle();
            $contractId = $bill->contract_id;
            $bundle->add("contractId", $contractId);

            event(new OnGetContract($bundle, new EventListenerRegister(["GetContractPayments"])));
            $contract = $bundle->getOutput("contract");
            $dompdf = PDF::loadView('bill.display', compact('bill', 'contract'));
            return $dompdf->stream(); 
        }
        catch(Exception $e) {

            return Result::badRequestWeb($e);

        }
    }

    public function edit() {
        return view("bill.update");
    }



    public function apiEdit($billNo = null)  {

        if($billNo == null) {

            return Result::badRequest(["message" => "Invalid Bill No"]);

        }

        $bill = $this->billRepository->includePayments()->findByBillNo($billNo)->first();

        if(!$bill) {

            return Result::badRequest(["message" => "Invalid Bill No"]);

        }

        $paymentInstance = $bill->createInstanceOfPayment();
        //create payment summary

        $bundle = new Bundle();
        $contractId = $bill->contract_id;
        $bundle->add("contractId",$contractId);
        $isIncluded = true;
        $bundle->add("paymentIncluded",$isIncluded);
        event(new OnGetContract($bundle,new EventListenerRegister(["GetContract"])));

        $contract = $bundle->getOutput("contract");
        $lookups = $this->selection->getSelections(array("payment_mode","payment_term","payment_status"));

        $paymentSummary = [
            "total_payment" => $bill->getSummary(),
            "total_cost" => $contract->amount
        ];

        return compact('bill','paymentSummary','contract','paymentInstance','lookups');
    }

    public function apiUpdate(BillForm $request) {
        try {

            $inputs = $request->filterInput();

            $currentBill = $this->billRepository->saveBill($inputs, Auth::user()->getAuthIdentifier());

            return Result::ok('update successfully');
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiSearch($filter='bill',$value='') {

        try {

            if ($filter == 'contract') {
                $field = 'contracts.contract_no';
            }
            else if($filter == 'tenant') {
                $field = 'tenants.code';
            }
            else {
                $field = 'contract_bills.bill_no';
            }

            $results = $this->billRepository->search($field,$value);

            return $results;

        }
        catch(Exception $e) {

        }
    }

}
