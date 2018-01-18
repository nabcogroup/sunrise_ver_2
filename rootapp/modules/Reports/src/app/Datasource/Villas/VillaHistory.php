<?php

namespace Reports\App\Datasource\Villas;


use App\Traits\QuerySoftDeleteTrait;
use App\Traits\ArrayGroupTrait;


use Carbon\Carbon;
use Reports\App\Datasource\IDataSource;


class VillaHistory implements IDataSource {

    use QuerySoftDeleteTrait,ArrayGroupTrait;

    private $params;

    public function __construct($params) {

        $this->params = $params;
        //group by villa 
        
    }

    public function execute() {

        $villa_no = $this->params->field('villa_no');

        $recordset = $this->createDb('villas')
                        ->join('contracts','contracts.villa_id','=','villas.id')
                        ->join('tenants','tenants.id','=','contracts.tenant_id')
                        ->join('contract_bills','contract_bills.contract_id','=','contracts.id')
                        ->select('villas.villa_no',
                                'tenants.full_name',
                                'tenants.id AS tenant_id', 
                                'contract_bills.bill_no',
                                'contracts.contract_no',
                                'contracts.status',
                                'contracts.amount',
                                'contracts.period_start',
                                'contracts.period_end',
                                \DB::raw("(SELECT SUM(amount) FROM payments WHERE status = 'clear' AND bill_id = contract_bills.id) AS total_payments"))
                        ->where('villas.villa_no',$villa_no)
                        ->orderBy('contracts.period_start')
                        ->get();

        
        $rows = $this->arrayGroupBy($recordset,function($row) {
            $item = [
                'tenant_id'         =>  $row->tenant_id,
                'tenant_name'       =>  $row->full_name,
                'contract_no'       =>  $row->contract_no,
                'bill_no'           =>  $row->bill_no,
                'period_start'      =>  Carbon::parse($row->period_start)->format('d M y'),
                'period_end'        =>  Carbon::parse($row->period_end)->format('d M y'),
                'amount'            =>  number_format($row->amount,2),
                'total_payments'    =>  number_format($row->total_payments,2),
                'balance'           =>  number_format(($row->amount - $row->total_payments),2),
                'status'            =>  ucfirst($row->status)
            ];

            return $item;

        },['villa_no']);
        
        $dataset = [
            'data' => $rows
        ];

        return $dataset;
            
    }

    public function lookups()
    {
        // TODO: Implement lookups() method.
    }
}