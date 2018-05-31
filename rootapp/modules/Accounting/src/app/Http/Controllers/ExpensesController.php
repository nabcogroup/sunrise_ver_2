<?php


namespace Accounting\App\Http\Controllers;

use Accounting\App\Events\OnSaveTransaction;
use Accounting\App\Models\AccountChart;
use Accounting\App\Models\AccountsPayee;
use Accounting\App\Models\AccountsVilla;
use Accounting\App\Models\Expenditure;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Supports\Predictive;
use KielPack\LaraLibs\Supports\Result;

class ExpensesController extends Controller
{

    protected $predictive;


    public function __construct(Predictive $predictive)
    {
        $this->predictive = $predictive;
    }


    public function index(Request $request)
    {
        $transactions = Expenditure::getUnposted()->orderBy('doc_no')->get();

        return Result::response(["data" => $transactions]);

    }

    public function create(Request $request)
    {

        $expenditure = Expenditure::createInstance();
        $lookups = Selection::getSelections(["account_type", "payment_term", "bank", "villa_location", "bank_provider"]);

        $lookups["accounts"] = AccountChart::orderBy('description')->get();
        $lookups["villas"] = AccountsVilla::orderBy('villa_no')->get();
        $lookups["payees"] = AccountsPayee::orderBy("payee_code")->get();

        $rules = [
            'location' => 'required',
            'villa_id' => 'nonzero|integer',
            'acct_code' => 'required',
            'payee_id' => 'required|integer',
            'payment_date' => 'required|date',
            'mode_of_payment' => 'required',
            'doc_ref' => 'required',
            'doc_no' => 'required',
            'doc_date' => 'required|date'];

        $request->session()->forget('transaction_no');

        return Result::response(["data" => $expenditure, "lookups" => $lookups, "rules" => $rules]);
    }

    public function edit(Request $request, $transaction_no)
    {

        $transactions = Expenditure::getTransaction($transaction_no)->get();

        $transaction_detail = [
            'transaction_no' => $transactions->pluck('transaction_no')->first(),
            'transaction_status' => $transactions->pluck('transaction_status')->first(),
            'posted' => $transactions->pluck('posted')->first()
        ];

        $request->session()->put('transaction_no', $transaction_detail);

        return Result::response(["data" => $transactions, "transaction_no" => $transaction_detail]);

    }

    public function store(Request $request)
    {

        return $this->batchSave($request, false);
    }

    public function storeAndPost(Request $request)
    {
        return $this->batchSave($request, true);
    }

    public function getPredictives() {

        $predictives = $this->predictive->getAllDictionaries();

        return Result::response(['data' => $predictives]);
    }

    protected function batchSave(Request $request, $isPosting = false)
    {
        $transactionSet = $request->input('transaction_set');

        $items = isset($transactionSet['items']) ? $transactionSet['items'] : [];

        $this->validateRequest($items);

        $transactionNo = null;
        if(isset($transactionSet['transaction_no']) && $transactionSet['transaction_no'] != null) {

            //get session
            $sessionTransaction = $request->session()->get('transaction_no', null);
            $transactionNo = $sessionTransaction['transaction_no'];

            if($transactionNo != $transactionSet['transaction_no']) {
                throw new \Exception('Invalid transacation no');
            }
        }

        $request->session()->forget('transaction_no');

        if (is_null($transactionNo)) {
            $transactionNo = Expenditure::generateNewTransactionNo();
        }


        foreach ($items['data'] as $transaction) {

            if (!isset($transaction['id'])) {
                $transaction['transaction_no'] = $transactionNo;
                if ($isPosting) {
                    $transaction['posted'] = 1;
                }

                Expenditure::createWithUser($transaction);

            }
            else {

                $expenditure = Expenditure::find($transaction['id']);
                $expenditure->toMap($transaction);

                if ($isPosting) {
                    $expenditure->posted = 1;
                }

                $expenditure->saveWithUser();

            }

            //raise event
            event(new OnSaveTransaction($this->predictive,$transaction));
        }

        if (isset($items['deletedItems'])) {
            $deletedItems = $items['deletedItems'];
            foreach ($deletedItems as $deletedItem) {
                $expenditure = Expenditure::find($deletedItem);
                $expenditure->delete();
            }
        }

        return Result::response(["message" => "Successfully Save","data" => $transactionNo]);
    }


    protected function validateRequest($transactions)
    {

        if (count($transactions) == 0)
            return Result::badRequest(["errors" => "No Entry Found"]);

        if (!isset($transactions['data']))
            return Result::badRequest(["errors" => "cannot find dataset"]);

        $data = $transactions['data'];

        foreach ($data as $transaction) {

            $rules = [
                'location' => 'required',
                'villa_id' => 'required|exists:villas,id',
                'acct_code' => 'required',
                'payee_id' => 'required|integer',
                'payment_date' => 'required|date',
                'mode_of_payment' => 'required',
                'doc_ref' => 'required',
                'doc_no' => 'required',
                'doc_date' => 'required|date',
                'amount' => array("required", "regex:/^\d+?|^\d+\.\d{2}?/")
            ];

            $validator = Validator::make($transaction, $rules);

            if ($validator->fails()) {
                return Result::badRequest(["errors" => $validator->errors()]);
            }
        }
    }

}