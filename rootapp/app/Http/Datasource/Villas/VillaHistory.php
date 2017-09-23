<?php

namespace App\Http\Datasource\Villas;


use App\Traits\QuerySoftDeleteTrait;
use App\Traits\ArrayGroupTrait;
use App\Http\Datasource\IDataSource;

use Carbon\Carbon;


class VillaHistory implements IDataSource {

    use QuerySoftDeleteTrait,ArrayGroupTrait;

    private $params;

    public function __construct($params) {

        $this->params = $params;
        //group by villa 
        
    }

    public function execute() {

        $villa_no = $this->params['villa_no'];

        $recordset = $this->createDb('villas')
                        ->join('contracts','contracts.villa_id','=','villas.id')
                        ->join('tenants','tenants.id','=','contracts.tenant_id')
                        ->join('contract_bills','contract_bills.contract_id','=','contracts.id')
                        ->select('villas.villa_no','tenants.full_name', 
                            'contracts.contract_no','contracts.status','contracts.amount',
                            'contracts.period_start','contracts.period_end',
                            \DB::raw("(contracts.amount - (SELECT SUM(amount) FROM payments WHERE status = 'clear' AND bill_id = contract_bills.id)) AS balance"),
                            \DB::raw("(SELECT SUM(amount) FROM payments WHERE status = 'clear' AND bill_id = contract_bills.id) AS total_payments"))
                        ->where('villas.villa_no',$villa_no)
                        ->orderBy('contracts.period_start')
                        ->get();

        
        $rows = $this->arrayGroup($recordset,function($row) {
            $item = [
                'tenant_name'       =>  $row->full_name,
                'contract_no'       =>  $row->contract_no,
                'period_start'      =>  Carbon::parse($row->period_start)->format('d M y'),
                'period_end'        =>  Carbon::parse($row->period_end)->format('d M y'),
                'amount'            =>  number_format($row->amount,2),
                'total_payments'    =>  number_format($row->total_payments,2),
                'balance'    =>  number_format($row->balance,2),
                'status'            =>  ucfirst($row->status)
            ];

            return $item;

        },['villa_no']);


        return $rows;
            
    }

}