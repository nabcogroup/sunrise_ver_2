<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/5/2017
 * Time: 10:58 AM
 */

namespace App\Http\Datasource\Bank;


use App\BankAccount;
use App\Http\Datasource\IDataSource;
use App\Traits\ArrayGroupTrait;
use Carbon\Carbon;

class BankDeposit implements IDataSource
{
    use ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $account_no = $this->params["account_no"];
        $year = isset($this->params["year"]) ? $this->params["year"] : Carbon::now()->year;

        $accounts = BankAccount::with(["payments" => function($query) use($year) {
            $query
                ->where("status","clear")
                ->where(\DB::raw("YEAR(date_deposited)"),$year);
        }])
            ->where("account_no",$account_no)
            ->get();

        $rows = $this->arrayGroupBy($accounts,function($row) {
            $items = $this->arrayGroupBy($row->payments,function($payment)  use(&$row){
                $payment_items = [
                    "account_no"            =>  $row->account_no,
                    "deposit_date"          =>  \Carbon\Carbon::parse($payment->date_deposited)->format("d M Y"),
                    "bank_name"             =>  $row->bank_name,
                    "tenant_name"           =>  $payment->bill()->first()->tenant()->full_name,
                    "payment_no"            =>  $payment->payment_no,
                    "payment_type"          =>  $payment->payment_type,
                    "reciept_no"            =>  $payment->reference_no,
                    "amount"                =>  $payment->amount
                ];
                return $payment_items;
            },["deposited_month"]);

            return $items;

        },["account_no"]);


        return $rows;


    }
}