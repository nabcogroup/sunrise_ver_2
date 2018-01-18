<?php

namespace Reports\App\Datasource\Contracts;


use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Traits\HelperTrait;
use App\Traits\QuerySoftDeleteTrait;
use Carbon\Carbon;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

class ContractExpiring implements IDataSource
{

    use QuerySoftDeleteTrait;

    use ArrayGroupTrait;

    use HelperTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        $date_from = $this->params->fieldDate("date_from",Carbon::now());
        $date_to = $this->params->fieldDate("date_to",Carbon::now());
        
        $location = $this->params->field("location","");

        $dbRaw = $this->createDb('contracts')
            ->join('villas','contracts.villa_id','=','villas.id')
            ->join('tenants','contracts.tenant_id','=','tenants.id')
            ->join('contract_bills','contracts.id','=', 'contract_bills.contract_id')
            ->join('payments','contract_bills.id','=', 'payments.bill_id')
            ->select('contracts.created_at',
                    'contracts.contract_no',
                    'contracts.period_start as period_start',
                    'contracts.period_end as period_end',
                    'contracts.period_end_extended',
                    'contracts.extra_days',
                    'contracts.amount as amount',
                    'villas.location',
                    'villas.villa_no',
                    'tenants.full_name',
                    'contract_bills.id as contract_bill_id',
                    \DB::raw("(SELECT SUM(amount) FROM payments WHERE status = 'clear' AND bill_id = contract_bill_id) as total_payment"))
            ->distinct()
            ->where('contracts.status','active')
            ->orderBy('villas.villa_no');

        if(!empty($location)) {
            $dbRaw = $dbRaw->where('villas.location', $location);
        }


        if(!empty($date_from) && !empty($date_to)) {
            $dbRaw = $dbRaw->whereBetween('contracts.period_end',[$date_from,$date_to]);
        }
        else {
            $dbRaw = $dbRaw->where('contracts.period_end','<=',Carbon::now()->toDateString());
        }


        $items = $this->arrayItemize($dbRaw,function($row) {

            $item = [
                "villa_no"          =>  $row->villa_no,
                "location"          =>  $row->location,
                "full_name"         =>  $row->full_name,
                "contract_no"       =>  $row->contract_no,
                "created_at"        =>  Carbon::parse($row->created_at)->format('d, M, Y'),
                "period_start"      =>  Carbon::parse($row->period_start)->format('d, M, Y'),
                "period_end"        =>  Carbon::parse($row->period_end)->format('d, M, Y'),
                "extended_days"    =>   $row->extra_days,
                "total_year"        =>  $this->calculateTotalYearMonth($row->period_start,$row->period_end_extended),
                "end_date"          =>  Carbon::parse($row->period_end_extended)->format('d, M, Y'),
                "amount"            =>  $row->amount,
                "total_payment"     =>  $row->total_payment,
                "total_balance"     =>  $this->getDiff($row->amount,$row->total_payment),
                "exceed_days"            =>  Carbon::now()->diffInDays(Carbon::parse($row->period_end))
            ];
            
            return $item;

        },['location']);
        
        $this->params->update("location",Selection::getValue("villa_location",$location));
        
        return new ReportMapper("Expiring Contract",$this->params->toArray(),$items);

    }

    public function lookups()
    {
        $lookups = Selection::getSelections(["villa_location","contract_status"]);

        return $lookups;
    }
}