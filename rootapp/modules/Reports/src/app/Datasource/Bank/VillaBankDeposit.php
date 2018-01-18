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
use Carbon\Carbon;

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
        $date_from = Carbon::createFromDate($this->params->field("year"),$this->params->field("month_from"),1);
        $date_to = Carbon::createFromDate($this->params->field("year"),$this->params->field("month_to"),1)->addMonth()->subDay();

        $recordset = \DB::table("villas")
                        ->join("contracts", "contracts.villa_id","villas.id")
                        ->join("contract_bills","contract_bills.contract_id","contracts.id")
                        ->join("tenants","tenants.id","contracts.tenant_id")
                        ->join("payments", "payments.bill_id","contract_bills.id")
                        ->select("payments.date_deposited","payments.effectivity_date", "payments.amount","payments.bank_account","tenants.full_name","villas.villa_no","payments.payment_type","contracts.status","contracts.contract_no")
                        ->where("payments.status","clear")
                        ->where("villas.villa_no",$villa_no)
                        ->whereBetween("payments.date_deposited",[$date_from->format('Y-m-d'),$date_to->format('Y-m-d')])
                        ->get();

        $rows = $this->arrayGroupBy($recordset,function($row) {
            $item = [
                'date_deposited'    =>  Carbon::parse($row->date_deposited)->format(' d-M-Y'),
                'effectivity_date'    =>  Carbon::parse($row->effectivity_date)->format(' d-M-Y'),
                'amount'            =>  $row->amount,
                'bank_account'      =>  $row->bank_account,
                'contract_no'       =>  $row->contract_no,
                'full_name'         =>  $row->full_name,
                'villa_no'          =>  $row->villa_no,
                'payment_type'      =>  $row->payment_type
            ];

            return $item;

        },["bank_account"]);


        return new ReportMapper("Bank detail per Villa",$this->params->toArray(),$rows);

    }
}