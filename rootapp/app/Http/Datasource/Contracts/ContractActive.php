<?php

namespace App\Http\Datasource\Contracts;

use Carbon\Carbon;
use App\Selection;

use App\Traits\HelperTrait;
use App\Traits\ArrayGroupTrait;
use App\Traits\QueryTemplateTrait;
use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;

class ContractActive implements IDataSource
{

    use ArrayGroupTrait,
        HelperTrait,
        QueryTemplateTrait;


    private $params;
        


    public function __construct($params) {
        $this->params = $params;
    }
    public function execute()
    {

        $location = $this->params->field("location");

        $records = \DB::table('contracts')
                ->join('villas', 'contracts.villa_id','=','villas.id')
                ->join('tenants','contracts.tenant_id','=','tenants.id')
                ->join('contract_bills','contracts.id','=','contract_bills.contract_id')
                ->select('contracts.id','villas.villa_no',
                    'villas.location as villa_location',
                    'contracts.contract_no','contracts.period_start',
                    'contracts.period_end','tenants.full_name',
                    'contracts.amount as contract_value',
                    'contract_bills.id as contract_bill_id',
                    $this->sqlPaymentDue('contract_bill_id'))
                ->where('villas.location',$location)
                ->where('contracts.status','active')->distinct()
                ->orderBy('villa_no');

        $rows = $this->arrayItemize($records,function($row) {
            $item = [
                'villa_no'          =>  $row->villa_no,
                'contract_no'       =>  $row->contract_no,
                'tenant_name'       =>  $row->full_name,
                'period'            =>  Carbon::parse($row->period_start)->format('d, M, Y').' - '.Carbon::parse($row->period_end)->format('d, M, Y'),
                'contract_value'    =>  $row->contract_value,
                'total_years'       =>  $this->calculateTotalYearMonth($row->period_start,$row->period_end),
                'gross_sale'        =>  ($row->gross_sale == null) ? 0 : $row->gross_sale,
                'credit_sale'       =>  floatval($row->contract_value) - floatval($row->gross_sale)
            ];
            return $item;
        },['villa_location']);
        
        $this->params->update("location",Selection::getValue("villa_location",$location));
        
        return new ReportMapper("Active Contracts",$this->params->toArray(),$rows);


    }
}