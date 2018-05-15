<?php


namespace Accounting\App\Http\Controllers;

use Accounting\App\Models\AccountChart;
use Accounting\App\Models\AccountsPayee;
use Accounting\App\Models\AccountsVilla;
use Accounting\App\Models\Expenditure;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Supports\Result;

class ExpensesController extends Controller
{
    public function __construct()
    {
        
    }


    public function index(Request $request) {

        $transactions = Expenditure::transactionList()->get();

        return Result::response(["data" => $transactions]);
    }

    public function create() {

        $expenditure = Expenditure::createInstance();
        $lookups = Selection::getSelections(["account_type","payment_term","bank","villa_location","bank_provider"]);
        
        $lookups["accounts"] = AccountChart::all();
        $lookups["villas"] =  AccountsVilla::orderBy('villa_no')->get();
        $lookups["payees"] = AccountsPayee::orderBy("payee_code")->get();

        $rules = [
            'location'          =>  'required',
            'villa_id'          =>  'required|integer|0',
            'acct_code'         =>  'required',
            'payee_id'          =>  'required|integer',
            'payment_date'      =>  'required|date',
            'mode_of_payment'   =>  'required',
            'doc_ref'           =>  'required',
            'doc_no'            =>  'required',
            'doc_date'          =>  'required|date'
        ];

        return Result::response(["data" => $expenditure,"lookups" => $lookups, "rules" => $rules ]);

    }

    public function edit(Request $request,$transaction_no) {

        $transactions = Expenditure::getTransaction($transaction_no)->get();

        $plucked = $transactions->pluck('transaction_no');

        $request->session()->put('transaction_no', $plucked->first());

        return Result::response(["data" => $transactions]);

    }



    public function store(Request $request) {

        $transactions = $request->input('transactions');

        $this->validateRequest($transactions);

        //get session
        $transactionNo = $request->session()->get('transaction_no',null);

        if(is_null($transactionNo)) {
            $transactionNo = Expenditure::generateNewTransactionNo();
        }
        else {
            $request->session()->forget('transaction_no');
        }



        foreach ($transactions as $transaction) {
            if(!isset($transaction['id'])) {
                $transaction['transaction_no'] = $transactionNo;
                Expenditure::create($transaction);
            }
            else {
                $expenditure = Expenditure::find($transaction['id']);
                $expenditure->toMap($transaction);
                $expenditure->save();
            }
        }

        return Result::response(["message" => "Successfully Save"]);

    }





    protected function validateRequest($transactions) {

        if(count($transactions) == 0) return Result::badRequest(["errors" => "No Entry Found"]);

        foreach ($transactions as $transaction) {

            $rules = [
                'location'          =>  'required',
                'villa_id'          =>  'required|exists:villas,id',
                'acct_code'         =>  'required',
                'payee_id'          =>  'required|integer',
                'payment_date'      =>  'required|date',
                'mode_of_payment'   =>  'required',
                'doc_ref'           =>  'required',
                'doc_no'            =>  'required',
                'doc_date'          =>  'required|date',
                'amount'            =>  array("required","regex:/^\d+?|^\d+\.\d{2}?/")
            ];

            $validator = Validator::make($transactions,$rules);

            if($validator->fails()) {
                return Result::badRequest(["errors" => $validator->errors()]);
            }
        }
    }




}