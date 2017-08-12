<?php

namespace App\Http\Datasource;


use App\Villa;

class ActiveVillaDataSource implements IDataSource
{
    public function __construct()
    {

    }

    public function execute()
    {
        $villas = Villa::with('engageContracts')->orderBy('villa_no')->get();

//        $active = \DB::table('villas')
//                    ->join('contracts','villas.id','=','contracts.villa_id')
//                    ->join('tenants','contracts.tenant_id','=','tenants.id')
//                    ->select('villas.villa_no',
//                        'villas.villa_class',
//                        'villas.rate_per_month',
//                        'contracts.created_at',
//                        'contracts.period_start',
//                        'contracts.period_end',
//                        'contracts.amount',
//                        'tenants.full_name')
//            ->whereIn('contracts.status',['active','pending'])
//            ->get();
        $rows = [];
        foreach ($villas as $villa) {
            $row = [
                'id'                =>  $villa->getId(),
                'villa_no'          =>  $villa->villa_no,
                'location'          =>  $villa->location,
                'created_at'        =>  \Carbon\Carbon::parse($villa->created_at)->format('d M Y'),
                'rate_per_month'    =>  $villa->rate_per_month,
                'villa_status'      =>  $villa->status,
                'period_start'      =>  '',
                'period_end'        =>  '',

            ];

            if(!empty($villa->engageContracts()->first())) {
                $contract = $villa->engageContracts()->first();

                $row['tenant_name'] = $contract->tenant()->first()->full_name;
                $row['contract_no'] = $contract->first()->contract_no;
                $row['period_start'] = \Carbon\Carbon::parse($contract->first()->period_start)->format('d M Y');
                $row['period_end']   = \Carbon\Carbon::parse($contract->period_end)->format('d M Y');
                $row['contract_status'] = $contract->status;


            }

            array_push($rows,$row);
        }


        return $rows;


    }
}