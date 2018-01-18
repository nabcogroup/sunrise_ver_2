<?php

namespace App\Http\Datasource\Bank;


use App\BankAccount;
use App\Http\Datasource\IDataSource;



class BankDepositSummary implements IDataSource {


    private $params;
    public function __construct($params) {
        $this->params = $params;
    }

    public function execute() {

        $month = $this->params->field("month",Carbon::now()->month);
        $year =  $this->params->field("month",Carbon::now()->year);
        $account_no = $this->params->field("account_no");
        $accounts = BankAccount::where("account_no",$account_no)->first();
        
        $rows = [
            "account_no"    =>  $accounts->account_no,
            "bank_name"     =>  $accounts->bank_name,
            "payments"      =>  $accounts->getAccountSummaryPerYear($year)->get()
        ];

            
        return [
            "title" =>  "Bank Deposit Summary",
            "data"  =>  $rows,
            "params" => []
        ];
    }


}