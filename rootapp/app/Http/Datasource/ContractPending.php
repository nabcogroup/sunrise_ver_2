<?php

namespace App\Http\Datasource;


use App\Traits\QuerySoftDeleteTrait;

class ContractPending implements IDataSource
{
    use QuerySoftDeleteTrait;


    public function execute()
    {
        $dbRaw = $this->createDb('contracts')
                ->join('villas','contracts.villa_id','=','villas.id')
                ->join('tenants','contracts.tenant_id','=','tenants.id')
                ->select('contracts.created_at', 'contracts.contract_no','period_start','period_end','amount','villas.villa_no','tenants.full_name')
                ->where('contracts.status','pending')
                ->orderBy('villas.villa_no')->get();

        return $dbRaw;



    }
}