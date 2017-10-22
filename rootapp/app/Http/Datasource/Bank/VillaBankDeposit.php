<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/12/2017
 * Time: 5:48 PM
 */

namespace App\Http\Datasource\Bank;


use App\BankAccount;
use App\Traits\ArrayGroupTrait;
use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;

class VillaBankDeposit implements IDataSource
{

    use ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }


    public function execute()
    {

        $villa_no = $this->params->field("villa_no");
        $date_from = $this->params->fieldDate("date_from");
        $date_to = $this->params->fieldDate("date_to");



        $recordset = \DB::table("villas")
                        ->join("contracts", "contracts.villa_id","villas.id")
                        ->join("contract_bills","contract_bills.contract_id","contracts.id")
                        ->join("payments", "payments.bill_id","contract_bills.id")
                        ->select("payments.date_deposited","payments.amount","payments.bank_account")
                        ->where("payments.status","clear")
                        ->where("villas.villa_no",$villa_no)
                        ->whereBetween("payments.date_deposited",[$date_from,$date_to])
                        ->get();

        $rows = $this->arrayGroupBy($recordset,null,["bank_account"]);


        return new ReportMapper("Bank detail per Villa",$this->params->toArray(),$rows);

    }
}