<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MockupMobileController extends Controller
{
    public function mockMain()
    {
        return [
            [
            "location"      =>  "Sunrise Residence 1",
            "vacant"        =>  10,
            "occupied"      =>  20,
            "total_sales"   =>  120000
            ],
            [
                "location"      =>  "Sunrise Residence 2",
                "vacant"        =>  8,
                "occupied"      =>  42,
                "total_sales"   =>  420000
            ],
            [
                "location"      =>  "Bldg 24",
                "vacant"        =>  24,
                "occupied"      =>  0,
                "total_sales"   =>  80000
            ]
        ];
    }


    public function mockContractList($status = "pending") {

        $contractRepo = new \App\Repositories\ContractRepository();
        
        $contracts = $contractRepo->getContracts($status);

        return $contracts;
    }

    public function mockCalendar(Request $request) {
        
        $periods = $request->all();
        $contractRepo = new \App\Repositories\ContractRepository();
        $contracts = $contractRepo->includeAssociates()
            ->activeOnly()
            ->getExpiryContracts(\Carbon\Carbon::parse($periods['start']), \Carbon\Carbon::parse($periods['end']))
            ->get();

        $events = array();

        if ($contracts) {
            foreach ($contracts as $contract) {
                $event = [
                    "contract"      =>  $contract,
                    "id"            =>  $contract->getId(),
                    "contract_no"   =>  $contract->contract_no,
                    "full_name"     =>  $contract->tenant()->first()->full_name,
                    "period"        =>  ["start" => $contract->period_start, "end" => $contract->period_end_extended],
                    "title"         =>  $contract->villa()->first()->villa_no ." - ".$contract->tenant()->first()->full_name,
                    "start"         =>  \Carbon\Carbon::parse($contract->period_end_extended)->subDays(3)->toDateString(),
                    "end"           =>  \Carbon\Carbon::parse($contract->period_end_extended)->toDateString(),
                    "canRenew"      =>  true,
                ];

                array_push($events, $event);
            }
        }

        return $events;
    }

    
}
