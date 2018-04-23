<?php


namespace Accounting\App\Http\Controllers;


use Accounting\App\Models\Expenditure;

use App\AccountChart;
use App\Payee;
use App\Villa;

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


    public function index() {

        $transactions = Expenditure::transactionList()->get();

        return Result::response(["data" => $transactions]);

    }

    public function create() {

        $expenditure = Expenditure::createInstance();

        $lookups = Selection::getSelections(["account_type","payment_term","bank","villa_location","bank_provider"]);
        $lookups["accounts"] = AccountChart::all();
        $lookups["villas"] = Villa::orderBy("villa_no")->get();
        $lookups["payees"] = Payee::orderBy("payee_code")->get();

        $rules = [
            'location'          =>  'required',
            'villa_id'          =>  'required|integer',
            'expense_type'      =>  'required',
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



    public function store(Request $request) {

        $transactions = $request->input('transactions');

        $this->validateRequest($transactions);

        $newTransactionNo = Expenditure::generateNewTransactionNo();

        foreach ($transactions as $transaction) {
            $transaction['transaction_no'] = $newTransactionNo;
            Expenditure::create($transaction);
        }

        return Result::response(["message" => "Successfully Save"]);
    }

    protected function validateRequest($transactions) {

        if(count($transactions) == 0) return Result::badRequest(["errors" => "No Entry Found"]);

        foreach ($transactions as $transaction) {

            $rules = [
                'location'          =>  'required',
                'villa_id'          =>  'required|exists:villas,id',
                'expense_type'      =>  'required',
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