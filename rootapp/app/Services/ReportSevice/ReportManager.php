<?php

namespace App\Services\ReportService;

use App\Http\Datasource\Bank\VillaBankDeposit;
use App\Http\Reports\ReceivableReport;
use App\Http\Reports\VillaPaymentCollectionReport;
use App\Traits\ReportParamHelperTrait;
use Carbon\Carbon;
use App\Http\Reports\BankReport;
use App\Http\Reports\TenantReport;
use App\Http\Reports\ContractReport;
use App\Http\Reports\VillaFormReport;
use App\Http\Reports\VillaSalesReport;
use App\Http\Reports\ExpenseMasterReport;

use App\Http\Reports\VillaMasterListReport;


class ReportManager
{
    use ReportParamHelperTrait;


    protected static $reports = [];

    public static function get($key,$params)
    {
        self::$reports = [
            'villa_master'          =>  new VillaFormReport($params,'form'),
            'contract_value'        =>  new ContractReport($params,'value'),
            'contract_pending'      =>  new ContractReport($params,'pending'),
            'contract_expiry'       =>  new ContractReport($params,'expiry'),
            'contract_active'               =>  new ContractReport($params,'active'),
            'payment_schedule'              =>  new ReceivableReport($params),
            'villa_payment'                 =>  new VillaSalesReport($params),
            'payment_collection'  =>  new VillaPaymentCollectionReport($params),
            'expense_property'      =>  new ExpenseMasterReport($params),
            'villa_history'         =>  new VillaFormReport($params,'ledger'),
            'tenant_history'        =>  new TenantReport($params),
            "bank_report_detail"    =>  new BankReport("detail",$params),
            "bank_report_summary"   =>  new BankReport("summary",$params),   
            'villa_master_list'     =>  new VillaMasterListReport($params),
            "villa_bank_deposit"    =>  new VillaBankDeposit($params)
        ];
        
        return self::$reports[$key];
    }

    public static function getReportList()
    {
        $reports = config("appreport.report");

        return $reports;
    }

    public static function getParameter() {

        $params = [
            [
                'report_id' => 2,
                'inputs' => [
                    self::createDropdowns("Status","contract_status","contract_status","code","name","All"),
                    self::createInput("Year","contract_year","number","Enter Year (2017)"),
                    self::createDropdowns("Location","location","villa_location","code","name","--Select Location--"),
                ],
                'models' => [
                    'contract_status' => '',
                    'contract_year' => '',
                    'location' => ''
                ],
                'lookups' => [],
            ],
            [
                'report_id' => 1,
                'inputs' => [
                    ['label' => 'Enter Villa No', 'type' => 'dropdown','selection' => 'villas','model' => 'villa_no','default_text' => 'All','default' => ''],
                ],
                'models' => [
                    'villa_no' => ''
                ],
                'lookups' => []
            ],
            [
                'report_id' => 3,
                'inputs' =>
                    [
                        ['label' => 'Location', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Location--', 'default' => '' ],
                        [
                            'label' => 'Month From', 
                            'type' => 'dropdown',
                            'selection' => 'months', 
                            'model' => 'month_from',
                            'default_text' => '--Select Month--',
                            'default' => ''
                        ],
                        [
                            'label' => 'Month To',
                            'type' => 'dropdown',
                            'selection' => 'months',
                            'model' => 'month_to',
                            'default_text' => '--Select Month--',
                            'default' => ''
                        ],
                        
                        ['label' => 'Year', 'type' => 'number', 'model' => 'year', 'placeholder' => 'Enter Month Year'],

                    ],
                'models' => [
                    'month_from' => '',
                    'month_to' => '',
                    'year' => '',
                    'location' => ''
                ],
                'lookups' => []
            ],
            [
                'report_id' => 4,
                'inputs' => [
                        ['label' => 'Location', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Location--', 'default' => '' ],
                        ['label' => 'Villa No', 'type' => 'dropdown','selection' => 'villas','model' => 'villa_id','default_text' => 'All','default' => '' ],
                        ['label' => 'Date From', 'type' => 'date','model' => 'date_from'],
                        ['label' => 'Date To', 'type' => 'date','model' => 'date_to'],
                    ],
                'models' => [
                    'location'  =>  '',
                    'villa_id'  =>  '',
                    'date_from' =>  Carbon::now()->toDateString(),
                    'date_to'   =>  Carbon::now()->toDateString()
                ],
                'lookups' => []
            ],
            [
                'report_id' => 6,
                'inputs' => [
                    ['label' => 'Location', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Location--', 'default' => '' ],
                    ['label' => 'Date From', 'type' => 'date','model' => 'date_from'],
                    ['label' => 'Date To', 'type' => 'date','model' => 'date_to'],
                ],
                'models' => [
                    'location'  =>  '',
                    'date_from' =>  Carbon::now()->toDateString(),
                    'date_to'   =>  Carbon::now()->toDateString()
                ],
                'lookups' => []
            ],
            [
                'report_id' => 7,
                'inputs' => [
                    ['label' => 'Location', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Location--', 'default' => '' ],
                ],
                'models' => [
                    'location'  =>  '',
                ],
                'lookups' => []
            ],
            [
                'report_id' => 8,
                'inputs' =>
                    [
                        [
                            'label' => 'Month From',
                            'type' => 'dropdown',
                            'selection' => 'months',
                            'model' => 'month_from',
                            'default_text' => '--Select Month--',
                            'default' => ''

                        ],
                        [
                            'label' => 'Month To',
                            'type' => 'dropdown',
                            'selection' => 'months',
                            'model' => 'month_to',
                            'default_text' => '--Select Month--',
                            'default' => ''
                        ],
                        ['label' => 'Year', 'type' => 'number', 'model' => 'year', 'placeholder' => 'Enter Month Year'],
                        [
                            'label' => 'Location', 
                            'type' => 'dropdown',
                            'selection' => 'villa_location',
                            'model' => 'location',
                            'default_text' => '--Select Location--', 
                            'default' => '' 
                        ],
                    ],
                'models' => [
                    'month_from' => '',
                    'month_to' => '',
                    'location' => ''
                ],
                'lookups' => []
            ],
            [
                'report_id' => 9,
                'inputs' =>
                    [
                        [
                            'label' => 'Account No', 
                            'type' => 'dropdown',
                            'selection' => "bank_account",
                            'model' => 'account_no',
                            'value' =>  'account_no',
                            'text'  =>  'account_no',
                            'default_text' => 'All Accounts', 
                            'default' => ''],
                        [   
                            'label' => 'For the Month of', 
                            'type' => 'dropdown',
                            'selection' => 'months',
                            'model' => 'month',
                            'actions' => ['func' => 'autoDate', 'bind_from' => 'month_from','bind_to' => 'month_to']
                        ],  
                        ['label' => 'Date From', 'type' => 'date','model' => 'month_from','placeholder' => 'Enter Month From'],
                        ['label' => 'Date To', 'type' => 'date', 'model' => 'month_to', 'placeholder' => 'Enter Month To'],
                        
                    ],
                'models' => [
                    'account_no' => '',
                    'month' => Carbon::now()->month,
                    'month_from' => Carbon::createFromDate(Carbon::now()->year,Carbon::now()->month,1)->format("m/d/Y"),
                    'month_to' => Carbon::createFromDate(Carbon::now()->year,Carbon::now()->month,1)->addMonth()->subDay()->format("m/d/Y"),
                ],
                'lookups' => []
            ],
            [
                'report_id' =>  10,
                'inputs' => [
                    self::createDropdowns("Location","location","villa_location","code","name","--Select Property--"),
                    self::createDropdowns("Payment Type","payment_type","payment_term","code","name","--Select Payment Type--"),
                    self::createInput("Year","year","number","Enter Year ie(2017)"),
                    self::createMonthLookup("Month From","month_from"),
                    self::createMonthLookup("Month To","month_to"),
                ],
                'models'    =>  [
                    "location"      =>  "",
                    "payment_type"  =>  "",
                    "year"          =>  Carbon::now()->year,
                    "month_from"    =>  self::createMonthModel(Carbon::now())->month,
                    "month_to"      =>  self::createMonthModel(Carbon::now(),true)->month
                ],
                "lookups" => []
            ]
        ];

        return [
            'params'    => $params,
        ];
    }
}