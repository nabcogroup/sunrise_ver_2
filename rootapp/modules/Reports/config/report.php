<?php


use Carbon\Carbon;
use Reports\app\Services\ClientParamHelper;

return [
    "inputs" => [
        'contract_value' => [
            'components' => [
                ClientParamHelper::createDropdown("Status", "contract_status", "contract_status", "code", "name", "All"),
                ClientParamHelper::createInput("Year", "contract_year", "number", "Enter Year (2017)"),
                ClientParamHelper::createDropdown("Property", "location", "villa_location", "code", "name", "--Select Property--")
            ],
            'models' => [
                'contract_status' => '',
                'contract_year' => '',
                'location' => ''
            ],
            'lookups' => []
        ],


        'contract_expiry'   =>  [
            'components'    =>  [
                ClientParamHelper::createDropdown("Property", "location", "villa_location", "code", "name", "--Select Property--"),
                ClientParamHelper::createInput("Date From", "date_from", "date", ""),
                ClientParamHelper::createInput("Date To", "date_to", "date", ""),
            ],
            'models' => [
                'location' => '',
                'date_from' => \Carbon\Carbon::now()->toDateString(),
                'date_to' => \Carbon\Carbon::now()->toDateString()
            ],
            'lookups' => []
        ],

        'payment_schedule'  =>  [
            'components' => [
                ClientParamHelper::createDropdown("Report Type", "report_type", "report_type", "code", "name", "--Select Report Type--"),
                ClientParamHelper::createDropdown("Month From", "month_from", "months", "code", "name", "--Select Month From--"),
                ClientParamHelper::createDropdown("Month To", "month_to", "months", "code", "name", "--Select Month To--"),
                ClientParamHelper::createInput("Year", "year", "number", "Enter Year"),
                ClientParamHelper::createDropdown("Property", "location", "villa_location", "code", "name", "--Select Property--")
            ],
            'models' => [
                'month_from' => '',
                'month_to' => '',
                'location' => '',
                'year'  =>  '',
                'report_type' => ''
            ],
            'lookups' => []
        ],

        'villa_master_list' => [
            'components'    => [
                ClientParamHelper::createDropdown("Property", "location", "villa_location", "code", "name", "--Select Property--"),
                ClientParamHelper::createDropdown("Status", "status", "villa_status", "code", "name", "--Select Status--")
            ],
            'models'        => [
                'status' => '',
                'location' => ''
            ],
            'lookups'       => ['\PropertyLookup']
        ],

        'property'  =>  [
            'components' => [
                ClientParamHelper::createDropdown("Month From", "month_from", "months", "code", "name", "--Select Month From--"),
                ClientParamHelper::createDropdown("Month To", "month_to", "months", "code", "name", "--Select Month To--"),
                ClientParamHelper::createInput("Year", "year", "number", "Enter Year ie(2017)")
            ],
            'models' => [
                "year" => "",
                "month_from" => ClientParamHelper::createMonthModel(Carbon::now())->month,
                "month_to" => ClientParamHelper::createMonthModel(Carbon::now(), true)->month
            ],
            'lookups' => []
        ],

        'villa_form' => [
            'components' => [
                ClientParamHelper::createDropdown("Villa", "villa_no", "villas", "code", "name","--Select Status--"),
            ],
            'models' => [
                'villa_no' => ''
            ],
            'lookups' => []
        ],

        'expense_property' => [
            'components'    =>  [],
            'models'        =>  [
                'month_from'    => ClientParamHelper::createMonthModel(Carbon::now())->month,
                'month_to'      =>  ClientParamHelper::createMonthModel(Carbon::now(), true)->month,
                'year'          => '',
                'location'      => '',
                'villa_no'      => ''
            ],
            'lookups'       =>  [],
            'templateType' => 'custom'
        ],

        'bank_report_detail' =>[
            'components'    => [
                ClientParamHelper::createDropdown("Account No", "account_no", "bank_account", "account_no", "account_no","--Select All Accounts--","*"),
                ClientParamHelper::createDropdown("For the Month of", "month", "months", "code", "name","",""),
            ],
            'models'    =>  [
                'account_no' => '',
                'month' => Carbon::now()->month,
            ]
        ],
    ],


    /****************************
     // Server Configuration
     *******************************/
    "server" => [
        'contract_value' => [
            'datasource'    =>  'Contracts\ContractValue',
            'template'      =>  'contract_report.contract_value',
        ],

        'contract_expiry' => [
            'datasource'    =>  'Contracts\ContractExpiring',
            'template'      =>  'contract_report.contract_expiry'
        ],

        'payment_schedule' => [
            'datasource'    => 'Receivables\PaymentSchedule',
            'template'      =>  'receivable_report.payment_schedule'
        ],
        'villa_master_list' => [
            'datasource'    => 'Villas\VillaMasterMain',
            'template'      =>  'villa_report.villa_summary'
        ],
        'property' => [
            'datasource'    => 'Villas\PropertySummary',
            'template'      =>  'villa_report.property_summary'
        ],
        'villa_form' => [
            'datasource'    => 'Villas\VillaMasterMain',
            'template'      =>  'villa_report.villa_summary'
        ],

        'expense_property' => [
            'datasource'    => 'Expenses\ExpensesMaster',
            'template'      =>  'expense_report.expense_per_prop'
        ],

        'bank_report_detail' => [
            'datasource'    => 'Bank\BankDepositDetail',
            'template'      =>  'bank_report.bank_account_detail'
        ],

        'villa_payment' => [
            'datasource'    => 'Villas\VillaSales',
            'template'      =>  'sales_report.villa_sales_analysis'
        ],
        'payment_collection' => [
            'datasource'    =>  'Villas\VillaPaymentCollection',
            'template'      =>  'sales_report.villa_payment_collection'
        ],
        'loss_of_rent' => [
            'datasource'    =>  'Villas\LossOfRent',
            'template'      =>  'sales_report.loss_of_rent'

        ],
        'sales_projection' => [
            'datasource'    =>  'Villas\VillaSalesProjection',
            'template'      =>  'sales_report.sales_projection'
        ],
    ],

    "clients" => [
        'contract' => [
            'title' =>  'Contract Reports',
            'modules' =>  [
                'contract_value' => [
                    'report_title'          =>  'Contract Master List',
                    'report_name'           =>  'contract_value',
                    'inputs'                =>  'contract_value'
                ],
                'contract_expiry' => [
                    'report_title'  =>  'Due Contract',
                    'report_name'   =>  'contract_expiry',
                ],
            ]
        ],
        'bill' => [
            'title' =>  'Account Receivable Report',
            'modules'  =>  [
                'payment_schedule' => [
                    'report_title'  => 'Payment Schedule',
                    'report_name'   => 'payment_schedule'
                ],
            ]
        ],
        'villa' => [
            'title' =>  'Villa Reports',
            'modules'  =>  [
                'villa_master_list' => [
                    'report_title' => 'Villa Master List',
                    'report_name' => 'villa_master_list',
                ],
                'property' => [
                    'report_title' => 'Property Total Contract Summary',
                    'report_name' => 'property',
                ],
                'villa_form' => [
                    'title' => 'Villa Form Report',
                    'report_name' => 'villa_form',
                ],
            ]
        ],
        'expenses' => [
            'title' =>  'Expenses Reports',
            'modules'  =>  [
                'expense_property' => [
                    'report_title' => 'Expenses Master List - Property',
                    'report_name' => 'expense_property',
                ]
            ],
        ],
        'bank' => [
            'title' =>  'Bank Reports',
            'modules'  =>  [
                'bank_report_detail' => [
                    'report_title'  =>  "Bank Detail Report",
                    'report_name'   =>  "bank_report_detail",

                ]
            ]
        ],
        'sales' =>  [
            'title' =>  'Sales Report',
            'modules'  =>  [
                'villa_payment' => [
                    'report_title' => 'Payment Sales Analysis',
                    'report_name' => 'villa_payment',
                ],
                'payment_collection' => [
                    'report_title'  =>  'Payment Sales Collection',
                    'report_name'   =>  'payment_collection',
                ],
                'loss_of_rent' => [
                    'report_title'  =>  'Loss of Rental Income Report',
                    'report_name'   =>  'loss_of_rent',
                ],
                'sales_projection' => [
                    'report_title'  =>  'Active Property Sales Report',
                    'report_name'   =>  'sales_projection',
                ],
            ]
        ],
    ],



];


