<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/12/2017
 * Time: 5:48 PM
 */

namespace App\Http\Datasource\Bank;


use App\BankAccount;
use App\Http\Datasource\IDataSource;

class VillaBankDeposit implements IDataSource
{

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }


    public function execute()
    {

        $villa_no = $this->params->field("villa_no");
        $month_from = $this->params->fieldDate("month_from");
        $month_to = $this->params->fieldDate("month_to");


        $recordset = \DB::table("villas")
                        ->join("contracts", "contracts.villa_id","villas.id")
                        ->join("contract_bills","contract_bills.contract_id","contracts.id")
                        ->join("payments", "payments.bill_id","contract_bills.id")
                        ->select("payments.date_deposited","payments.amount")
                        ->where("payments.status","clear")
                        ->where("villas.villa_no",$villa_no)
                        ->whereBetween("payments.date_deposited",[$month_from,$month_to])
                        ->get();

        return $recordset;

    }
}