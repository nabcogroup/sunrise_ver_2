<?php

namespace App\Http\Reports;


use App\BankAccount;
use App\Traits\HelperTrait;
use App\Http\Datasource\Bank\BankDepositDetail;
use App\Http\Datasource\Bank\BankDepositSummary;

class BankReport extends BaseReport
{
    use HelperTrait;

    public function __construct($type,$params)
    {
        if($type == "summary") {
            $this->dataSource = new BankDepositSummary($params);
            $this->templateSource = "bank_report.detail";
        }
        else if($type == "per_villa") {
            $this->dataSource = new VillaBankDeposit($params);
            $this->templateSource = "bank_report.per_villa";
        }
        else {
            $this->dataSource = new BankDepositDetail($params);
            $this->templateSource = "bank_report.detail";
        }
    }

    public function isPdfRender()
    {
        return false;
    }


    public function isApi()
    {
        return false;
    }

    public function getLookups()
    {
        $lookups = [
            "bank_account"  =>  BankAccount::all(),
            "months"        =>  $this->getMonthLookups()
        ];

        return $lookups;
    }
}