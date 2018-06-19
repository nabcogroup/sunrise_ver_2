<?php

namespace App\Http\Datasource\Expenses;


use Accounting\App\Models\Expenditure;
use Carbon\Carbon;
use App\Selection;
use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;
use App\Traits\ArrayGroupTrait;

class ExpensesMaster implements IDataSource
{
    use ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $location = $this->params->field("location");
        $villa_no = $this->params->field("villa_no",'');

        $month_from = $this->params->fieldInt("month_from",0);
        $month_to = $this->params->fieldInt("month_to",0);
        $year = $this->params->fieldInt("year",Carbon::now()->year);

        $date_month_from = Carbon::createFromDate($year,$month_from,1);
        $date_month_to = Carbon::createFromDate($year,$month_to,1)->addMonth()->subDay();

        //range param
        $expenditures = \DB::table('expenditures')
            ->join('villas','villas.id','=','expenditures.villa_id')
            ->join('payees','payees.id','=','expenditures.payee_id')
            ->join('account_charts','account_charts.code','=','expenditures.acct_code')
            ->where('expenditures.location',$location)
            ->where('villas.villa_no',$villa_no)
            ->whereBetween('payment_date',[$date_month_from,$date_month_to])
            ->select(
                'expenditures.mode_of_payment',
                'villas.villa_no',
                'payees.name',
                'expenditures.payment_date',
                'expenditures.bank_provider',
                'expenditures.payment_ref',
                'expenditures.description AS expenditures_description',
                'account_charts.code',
                'account_charts.description AS account_charts_description',
                'expenditures.doc_no',
                'expenditures.doc_ref',
                'expenditures.doc_date',
                'expenditures.amount')
            ->orderBy('expenditures.payment_date');


//        $rows = [];
//        $rowExpense = [];

        $rows = $this->arrayGroupBy($expenditures->get(), function($item) {
            return [
                'villa_no'      =>  $item->villa_no,
                'payee_name'    =>  $item->name,
                'payment_date'  =>  $item->payment_date,
                'bank_provider' =>  $item->bank_provider,
                'payment_ref'   =>  $item->payment_ref,
                'accounts'      =>  $item->code . ' - ' . $item->account_charts_description,
                'description'   =>  $item->expenditures_description,
                'doc_no'        =>  $item->doc_no,
                'doc_ref'       =>  $item->doc_ref,
                'doc_date'      =>  Carbon::parse($item->doc_date)->format('d, M, Y'),
                'amount'        =>  $item->amount
            ];

        },["mode_of_payment"]);

//        foreach ($expenditures->get() as $expenditure) {
//            if($villa_id !== '') $villa_id = $expenditure->villas()->first()->villa_no;
//
//            $row = [
//                'id'                =>  $expenditure->getId(),
//                'villa_no'          =>  $expenditure->villas()->first()->villa_no,
//                'payee_name'        =>  $expenditure->payees()->first()->name,
//                'payment_date'      =>  Carbon::parse($expenditure->payment_date)->format('d, M, Y'),
//                'bank_provider'     =>  $expenditure->full_bank_provider,
//                'payment_ref'       =>  $expenditure->payment_ref,
//                'accounts'          =>  $expenditure->accounts()->first()->description,
//                'doc_no'            =>  $expenditure->doc_no,
//                'doc_ref'           =>  $expenditure->doc_ref,
//                'doc_date'          =>  Carbon::parse($expenditure->doc_date)->format('d, M, Y'),
//                'amount'            =>  $expenditure->amount
//            ];
//
//            if(isset($rows[$expenditure['mode_of_payment']])) {
//                $mode_of_payments = &$rows[$expenditure['mode_of_payment']];
//                if(isset($mode_of_payments[$expenditure['expense_type']])) {
//                    array_push($mode_of_payments[$expenditure['expense_type']],$row);
//                }
//                else {
//                    $mode_of_payments[$expenditure['expense_type']] = [$row];
//                }
//            }
//            else {
//                $rows[$expenditure['mode_of_payment']] = [$expenditure['expense_type'] => [$row]];
//            }
//        }
        
        
        
        $this->params->update("location",Selection::getValue("villa_location",$location));
        $this->params->add('date_from',$date_month_from);
        $this->params->add('date_to',$date_month_to);


        return new ReportMapper("Expenses Master List",$this->params->toArray(),$rows);

        


    }
}