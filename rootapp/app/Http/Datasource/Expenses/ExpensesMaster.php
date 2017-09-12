<?php

namespace App\Http\Datasource\Expenses;


use App\Expenditure;
use App\Http\Datasource\IDataSource;
use Carbon\Carbon;

class ExpensesMaster implements IDataSource
{
    private $param;

    public function __construct($param)
    {
        $this->param = $param;
    }

    public function execute()
    {

        $location = isset($this->param['location']) ? $this->param['location'] : '';
        $villa_id = isset($this->param['villa_id']) ? $this->param['villa_id'] : '';

        $date_from = isset($this->param['date_from']) ? Carbon::parse($this->param['date_from'])->toDateString() : '';
        $date_to = isset($this->param['date_to']) ? Carbon::parse($this->param['date_to'])->toDateString() : '';

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

            if($location !== '') $location = $expenditure->full_location;
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

        return [
            'location'  =>  $location,
            'villa_no'  =>  $villa_id,
            'date_from' =>  $date_from,
            'date_to'   =>  $date_to,
            'data'      => $rows
        ];


    }
}