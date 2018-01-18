<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/16/2017
 * Time: 10:32 AM
 */

namespace App\Http\Datasource\Receivables;


use App\ContractBill;
use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;

class BillStatement implements IDataSource
{

    protected $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        
        $bill_no = $this->params->field("bill_no");
        $bill = ContractBill::with("contract","payments")->where("bill_no",$bill_no)->first();

        $payments = $bill->payments()->where("status","clear")->get();
        $data = [
             "bill"              => $bill,
             "contract"          => $bill->contract,
             "clear_payments"    => $payments,
             "total_payments"    => number_format($payments->sum("amount"),2)
        ];

        return new ReportMapper("Payment Statement",$this->params->toArray(),$data);

    }
}