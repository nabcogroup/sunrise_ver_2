<?php


namespace Reports\App\Datasource\Receivables;


use App\ContractBill;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

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

    public function lookups()
    {
        // TODO: Implement lookups() method.
    }
}