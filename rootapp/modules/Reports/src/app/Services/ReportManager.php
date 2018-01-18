<?php

namespace Reports\App\Services;


use App\Http\Reports\ContractSummaryReport;
use App\Http\Reports\ProfitLossReport;
use App\Http\Reports\VillaSalesProjectionReport;
use Carbon\Carbon;
use App\Http\Reports\BankReport;
use App\Http\Reports\TenantReport;
use App\Http\Reports\PropertyReport;
use App\Http\Reports\ContractReport;
use App\Http\Reports\VillaFormReport;
use App\Traits\ReportParamHelperTrait;
use App\Http\Reports\ReceivableReport;
use App\Http\Reports\VillaSalesReport;
use App\Http\Reports\BillStatementReport;
use App\Http\Reports\ExpenseMasterReport;
use App\Http\Reports\VillaMasterListReport;


use App\Http\Reports\VillaPaymentCollectionReport;
use Illuminate\Support\Facades\App;


class ReportManager
{
    use ReportParamHelperTrait;


    protected static $reports = [];


    public static function get($key,$params)
    {

        $configs = config("appreport.php");

        foreach ($configs["report"] as $report) {

            if(key_exists($key,$report["data"])) {

                $data = (object)$report["data"][$key];

                $data->datasource = App::make("Reports\\App\\Datasource\\".$data->datasource);

                return $data;
            }
        }

        return false;

    }



    public static function getReportList()
    {
        $reports = config("report.report");

        return $reports;
    }

    public static function getParameter() {

        $params = [
            [
                'report_id' => 2,
                'inputs' => [
                    self::createDropdowns("Status","contract_status","contract_status","code","name","All"),
                    self::createInput("Year","contract_year","number","Enter Year (2017)"),
                    self::createDropdowns("Property","location","villa_location","code","name","--Select Property--"),
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
                    self::createDropdowns("Status","status","villa_status","code","name"),
                ],
                'models' => [
                    'status' => ''
                ],
                'lookups' => []
            ],
            [
                'report_id' => 3,
                'inputs' =>
                    [
                        [
                            'label' => 'Report Type',
                            'type' => 'dropdown',
                            'selection' => 'report_type',
                            'model' => 'report_type',
                            'default_text' => '--Select Report Type--',
                            'default' => ''
                        ],
                        [
                            'label' => 'Property',
                            'type' => 'dropdown',
                            'selection' => 'villa_location',
                            'model' => 'location',
                            'default_text' => '--Select Property--',
                            'default' => ''
                        ],
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
                    'location' => '',
                    'report_type' => ''
                ],
                'lookups' => []
            ],
            [
                'report_id' => 4,
                'inputs' => [
                        ['label' => 'Property', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Propery--', 'default' => '' ],
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
                    ['label' => 'Property', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Property--', 'default' => '' ],
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
                    ['label' => 'Property', 'type' => 'dropdown','selection' => 'villa_location','model' => 'location','default_text' => '--Select Property--', 'default' => '' ],
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
                            'label' => 'Report Type',
                            'type' => 'dropdown',
                            'selection' => 'report_type',
                            'model' => 'report_type',
                            'default_text' => '--Select Report Type--',
                            'default' => ''
                        ],
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
                            'label' => 'Property', 
                            'type' => 'dropdown',
                            'selection' => 'villa_location',
                            'model' => 'location',
                            'default_text' => '--Select Property--', 
                            'default' => '' 
                        ],
                    ],
                'models' => [
                    'month_from' => '',
                    'month_to' => '',
                    'location' => '',
                    'report_type' => ''
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
                    self::createDropdowns("Property","location","villa_location","code","name","--Select Property--"),
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
            ],
            [
                'report_id' =>  11,
                'inputs' => [
                    self::createMonthLookup("Month From","month_from"),
                    self::createMonthLookup("Month To","month_to"),
                    self::createInput("Year","year","number","Enter Year ie(2017)"),
                ],
                "models" => [
                    "year" => "",
                    "month_from" => self::createMonthModel(Carbon::now())->month,
                    "month_to" => self::createMonthModel(Carbon::now(),true)->month
                ],
                "lookups" => []
            ],
            [
                'report_id' =>  12,
                'inputs' => [
                    self::createMonthLookup("Month From","month_from"),
                    self::createMonthLookup("Month To","month_to"),
                    self::createDropdowns("Property","location","villa_location","code","name","--Select Property--"),
                    self::createDropdowns("Report Type","report_type","report_type","code","name","--Select Report Type--"),
                    self::createInput("Year","year","number","Enter Year ie(2017)"),
                ],
                "models" => [
                    "year" => "",
                    "month_from" => self::createMonthModel(Carbon::now())->month,
                    "month_to" => self::createMonthModel(Carbon::now(),true)->month,
                    "location" => "",
                    "report_type" => ""
                ],
                "lookups" => []
            ],
            [
                'report_id' =>  13,
                'inputs' => [
                    self::createMonthLookup("Month From","month_from"),
                    self::createMonthLookup("Month To","month_to"),
                    self::createDropdowns("Property","location","villa_location","code","name","--Select Property--"),
                    self::createDropdowns("Report Type","report_type","report_type","code","name","--Select Report Type--"),
                    self::createInput("Year","year","number","Enter Year ie(2017)"),
                ],
                "models" => [
                    "year" => "",
                    "month_from" => self::createMonthModel(Carbon::now())->month,
                    "month_to" => self::createMonthModel(Carbon::now(),true)->month,
                    "location" => "",
                    "report_type" => ""
                ],
                "lookups" => []
            ]
        ];

        return [
            'params'    => $params,
        ];
    }
}