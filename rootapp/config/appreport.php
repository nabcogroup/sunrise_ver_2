<?php


return [


    "report" => [
        'contract' => [
            'title' =>  'Contract Reports',
            'data' =>  [
                [
                    'id' => 2,
                    'report_title' => 'Contract Master List',
                    'report_name' => 'contract_value',
                ],
                [
                    'id' => 7,
                    'report_title' => 'Active Contract Status',
                    'report_name' => 'contract_active',

                ],
                [
                    'id' => 6,
                    'report_title' => 'Due Contract',
                    'report_name' => 'contract_expiry',

                ],
            ]
        ],
        'bill' => [
            'title' =>  'Account Receivable Report',
            'data'  =>  [
                [
                    'id' => 8,
                    'report_title' => 'Payment Schedule',
                    'report_name' => 'payment_schedule',

                ],
            ]
        ],
        'villa' => [
            'title' =>  'Villa Reports',
            'data'  =>  [
                [
                    'id' => 1,
                    'report_title' => 'Villa Master List',
                    'report_name' => 'villa_master',
                ],
                [
                    'id' => 11,
                    'report_title' => 'Property Total Contract Summary',
                    'report_name' => 'property',
                ]
            ]
        ],
        'expenses' => [
            'title' =>  'Expenses Reports',
            'data'  =>  [
                [
                    'id' => 4,
                    'report_title' => 'Expenses Master List - Property',
                    'report_name' => 'expense_property',
                ]
            ],
        ],
        'bank' => [
            'title' =>  'Bank Reports',
            'data'  =>  [
                [
                    'id'    => 9,
                    'report_title'  =>  "Bank Detail Report",
                    'report_name'   =>  "bank_report_detail",
                ]
            ]
        ],
        'sales' =>  [
            'title' =>  'Sales Report',
            'data'  =>  [
                [
                    'id' => 3,
                    'report_title' => 'Payment Sales Analysis',
                    'report_name' => 'villa_payment',
                ],
                [
                    'id' => 10,
                    'report_title'  =>  'Payment Sales Collection',
                    'report_name'   =>  'payment_collection'
                ],
                [
                    'id' => 12,
                    'report_title'  =>  'Loss of Rent',
                    'report_name'   =>  'profit_loss'
                ],

            ]
        ],
    ],









    "view" => [
        "contract" => [
            "active" => "contract_report.contract_active",
            "expiry" => "contract_report.contract_expiry",
            "pending" => "contract_report.contract_pending",
            "value" => "contract_report.contract_value",
            "summary" => "contract_report.contract_summary"
        ],
        "expense" => [
            "pre_prop" => "expense_report.expense_per_prop"
        ],
        "receivable" => [
            "schedule"  =>  "receivable_report.payment_schedule",
            "property"  =>  "receivable_report.property_schedule",
            "statement" =>  "receivable_report.bill_statement"
        ],
        "tenant" => [
            "history" => "tenant_report.tenant_history"
        ],
        "villa" => [
            "masterlist"    =>  "villa_report.villa_masterlist",
            "per_villa"     =>  "villa_report.villa_form",
            "history"       =>  "villa_report.villa_history",
            "property"      =>  "villa_report.property_summary"
        ],
        "sales" => [
            "analysis" => "sales_report.villa_sales_analysis",
            "property"   =>  "sales_report.property_sales_analysis",
            "collection" => "sales_report.villa_payment_collection",
            "villa_profit_loss"  => "sales_report.villa_loss_analysis",
            "sales_projection"  => "sales_report.sales_projection",
            "loss_of_rent" => "sales_report.loss_of_rent"
        ],
        "bank_report" => [
            "detail" => "bank_report.bank_account_detail",
            "per_villa" =>  "bank_report.bank_account_per_villa"
        ]
    ]

];

