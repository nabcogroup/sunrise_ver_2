<?php

namespace App\Http\Datasource\Expenses;


use Carbon\Carbon;
use App\Selection;
use App\Expenditure;
use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;

class ExpensesMaster implements IDataSource
{
    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $location = $this->params->field("location");
        $villa_id = $this->params->field("villa_id",0);

        $date_from = $this->params->fieldDate("date_from");
        $date_to = $this->params->fieldDate("date_to");

        //range param
        $expenditures = Expenditure::with('accounts','payees','villas');
        if($location != '') {
            $expenditures->where('location' , $location);
        }

        if($villa_id != '') {
            $expenditures->where('villa_id' , $villa_id);
        }

        if($date_from != '' && $date_to != '') {
            $expenditures->whereBetween('payment_date' , [$date_from,$date_to]);
        }

        $rows = [];
        $rowExpense = [];


        foreach ($expenditures->get() as $expenditure) {
            if($villa_id !== '') $villa_id = $expenditure->villas()->first()->villa_no;

            $row = [
                'id'                =>  $expenditure->getId(),
                'expense_type'      =>  $expenditure->expense_type,
                'villa_no'          =>  $expenditure->villas()->first()->villa_no,
                'payee_name'        =>  $expenditure->payees()->first()->name,
                'payment_date'      =>  Carbon::parse($expenditure->payment_date)->format('d, M, Y'),
                'bank_provider'     =>  $expenditure->full_bank_provider,
                'payment_ref'       =>  $expenditure->payment_ref,
                'accounts'          =>  $expenditure->accounts()->first()->description,
                'doc_no'            =>  $expenditure->doc_no,
                'doc_ref'           =>  $expenditure->doc_ref,
                'doc_date'          =>  Carbon::parse($expenditure->doc_date)->format('d, M, Y'),
                'amount'            =>  $expenditure->amount
            ];

            if(isset($rows[$expenditure['mode_of_payment']])) {
                $mode_of_payments = &$rows[$expenditure['mode_of_payment']];
                if(isset($mode_of_payments[$expenditure['expense_type']])) {
                    array_push($mode_of_payments[$expenditure['expense_type']],$row);
                }
                else {
                    $mode_of_payments[$expenditure['expense_type']] = [$row];
                }
            }
            else {
                $rows[$expenditure['mode_of_payment']] = [$expenditure['expense_type'] => [$row]];
            }
        }
        
        
        
        $this->params->update("location",Selection::getValue("villa_location",$location));
        $this->params->add("villa_no",$villa_id);

        return new ReportMapper("Expenses Master List",$this->params->toArray(),$rows);

        


    }
}