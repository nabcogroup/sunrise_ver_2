<?php 


namespace App\Http\Datasource\Tenants;

use App\Http\Datasource\IDataSource;
use App\Traits\ArrayGroupTrait;
use Carbon\Carbon;

class TenantHistory implements IDatasource {

    use ArrayGroupTrait;

    private $params; 

    public function __construct($params) {

        $this->params = $params;

    }


    public function execute()
    {
        $tenant_id = $this->params['tenant_id'];

        //tenant
        $recordset = \DB::table('tenants')
            ->join('contracts','contracts.tenant_id','=','tenants.id')
            ->join('contract_bills','contract_bills.contract_id', '=', 'contracts.id')
            ->join('villas','contracts.villa_id','=','villas.id')
            ->select(
                'tenants.full_name',
                'tenants.reg_id',
                'tenants.email_address',
                'tenants.mobile_no',
                'tenants.tel_no',
                'villas.villa_no',
                'contracts.contract_no',
                'contracts.contract_type',
                'contracts.amount',
                'contracts.period_start',
                'contracts.period_end',
                'contract_bills.bill_no',
                'contracts.status')
            ->groupBy(
                'tenants.full_name',
                'tenants.reg_id',
                'contracts.contract_no')
            ->whereNull('contracts.deleted_at')
            ->where('tenants.id',$tenant_id)
            ->orderBy('contracts.period_start')
            ->orderBy('contracts.period_end')
            ->get();
        
        $rows = $this->arrayGroupBy($recordset,function($rows) {

            $item = [
                'full_name'     =>  $rows->full_name,
                'reg_id'        =>  $rows->reg_id,
                'email_address' =>  $rows->email_address,
                'mobile_no'     =>  $rows->mobile_no,
                'tel_no'        =>  $rows->tel_no,
                'villa_no'      =>  $rows->villa_no,
                'contract_no'   =>  $rows->contract_no,
                'contract_type' =>  $rows->contract_type,
                'amount'        =>  $rows->amount,
                'period'        =>  Carbon::parse($rows->period_start)->format('d M Y') . " - " . Carbon::parse($rows->period_end)->format('d M Y'),
                'status'        =>  $rows->status
            ];

            return $item;

        },["reg_id"]);



        return $rows;
    }
}