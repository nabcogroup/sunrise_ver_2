<?php


return [

    "report" => [
        'contract' => [
            'title' =>  'Contract Reports',
            'data' =>  [
                'contract_value' => [
                    'id' => 2,
                    'report_title'  =>  'Contract Master List',
                    'report_name'   =>  'contract_value',
                    'datasource'    =>  'Contracts\ContractValue',
                    'template'      =>  'contract_report.contract_value'
                ],
                'contract_active' => [
                    'id' => 7,
                    'report_title'  =>  'Active Contract Status',
                    'report_name'   =>  'contract_active',
                    'datasource'    =>  'Contracts\ContractActive',
                    'template'      =>  'contract_report.contract_active'
                ],
                'contract_expiry' => [
                    'id' => 6,
                    'report_title'  =>  'Due Contract',
                    'report_name'   =>  'contract_expiry',
                    'datasource'    =>  'Contracts\ContractExpiring',
                    'template'      =>  'contract_report.contract_expiry'
                ],
            ]
        ],
        'bill' => [
            'title' =>  'Account Receivable Report',
            'data'  =>  [
                'payment_schedule' => [
                    'id' => 8,
                    'report_title'  => 'Payment Schedule',
                    'report_name'   => 'payment_schedule',
                    'datasource'    => 'Receivables\PaymentSchedule',
                    'template'      =>  'receivable_report.payment_schedule'
                ],
            ]
        ],
        'villa' => [
            'title' =>  'Villa Reports',
            'data'  =>  [
                'villa_master_list' => [
                    'id' => 1,
                    'report_title' => 'Villa Master List',
                    'report_name' => 'villa_master_list',
                    'datasource'    => 'Villas\VillaMasterMain',
                    'template'      =>  'villa_report.villa_summary'
                ],
                'property' => [
                    'id' => 11,
                    'report_title' => 'Property Total Contract Summary',
                    'report_name' => 'property',
                    'datasource'    => 'Villas\PropertySummary',
                    'template'      =>  'villa_report.property_summary'
                ]
            ]
        ],
        'expenses' => [
            'title' =>  'Expenses Reports',
            'data'  =>  [
                'expense_property' => [
                    'id' => 4,
                    'report_title' => 'Expenses Master List - Property',
                    'report_name' => 'expense_property',
                    'datasource'    => 'Expenses\ExpensesMaster',
                    'template'      =>  'expense_report.expense_per_prop'
                ]
            ],
        ],
        'bank' => [
            'title' =>  'Bank Reports',
            'data'  =>  [
                'bank_report_detail' => [
                    'id'    => 9,
                    'report_title'  =>  "Bank Detail Report",
                    'report_name'   =>  "bank_report_detail",
                    'datasource'    => 'Bank\BankDepositDetail',
                    'template'      =>  'bank_report.bank_account_detail'
                ]
            ]
        ],
        'sales' =>  [
            'title' =>  'Sales Report',
            'data'  =>  [
                'villa_payment' => [
                    'id' => 3,
                    'report_title' => 'Payment Sales Analysis',
                    'report_name' => 'villa_payment',
                    'datasource'    => 'Villas\VillaSales',
                    'template'      =>  'sales_report.villa_sales_analysis'
                ],
                'payment_collection' => [
                    'id' => 10,
                    'report_title'  =>  'Payment Sales Collection',
                    'report_name'   =>  'payment_collection',
                    'datasource'    =>  'Villas\VillaPaymentCollection',
                    'template'      =>  'sales_report.villa_payment_collection'
                ],
                'loss_of_rent' => [
                    'id' => 12,
                    'report_title'  =>  'Loss of Rental Income Report',
                    'report_name'   =>  'loss_of_rent',
                    'datasource'    =>  'Villas\LossOfRent',
                    'template'      =>  'sales_report.loss_of_rent'

                ],
                'sales_projection' => [
                    'id' => 13,
                    'report_title'  =>  'Active Property Sales Report',
                    'report_name'   =>  'sales_projection',
                    'datasource'    =>  'Villas\VillaSalesProjection',
                    'template'      =>  'sales_report.sales_projection'
                ],
            ]
        ],
    ],








];


