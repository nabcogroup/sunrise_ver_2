<?php

namespace App\Http\Datasource\Contracts;

use App\Contract;
use App\Selection;
use Carbon\Carbon;
use App\Traits\HelperTrait;
use App\Traits\ArrayGroupTrait;
use App\Http\Datasource\IDataSource;
use App\Traits\QuerySoftDeleteTrait;
use App\Services\ReportService\ReportMapper;

class ContractValue implements IDataSource
{
    use ArrayGroupTrait;

    use QuerySoftDeleteTrait;

    use HelperTrait;

    private $params;


    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $contract_status = $this->params->field("contract_status");
        $contract_year = $this->params->field("contract_year", Carbon::now()->year);
        $location = $this->params->field("location");

        $recordset = $this->createDb('contracts')
                        ->join('villas', 'villas.id', '=', 'contracts.villa_id')
                        ->join('tenants', 'tenants.id', '=', 'contracts.tenant_id')
                        ->where('villas.location', $location)
                        ->orderBy('villas.villa_no')
                        ->select('villas.villa_no', 'contracts.contract_no',
                            'contracts.created_at', 'tenants.full_name',
                            'contracts.period_start', 'contracts.period_end',
                            'villas.rate_per_month', 'contracts.amount', 'contracts.status');
        
        if (!is_null($contract_status)) {
            $recordset->where('contracts.status', $contract_status);
        } 
        else {
            $recordset->whereIn('contracts.status', ["pending","terminated","active"]);
        }
        
        $recordset = $recordset->get();
        
        $rows = $this->arrayGroup($recordset, function ($row) {
            $item = [
                'villa_no'      =>  $row->villa_no,
                'contract_no'   =>  $row->contract_no,
                'date_entry'    =>  \Carbon\Carbon::parse($row->created_at)->format('d M y'),
                'full_name'     =>  $row->full_name,
                'date_period'   =>  \Carbon\Carbon::parse($row->period_start)->format('d M y')." - ".\Carbon\Carbon::parse($row->period_end)->format('d M y'),
                'total_year'    =>  $this->calculateTotalYearMonth($row->period_start, $row->period_end),
                'rate_per_month'    =>  number_format($row->rate_per_month, 2),
                'full_value'        =>  number_format($row->amount, 2),
                'contract_status'   =>  ucfirst($row->status)];

            return $item;
        });
        
        $this->params->add("total", $recordset->sum('amount'));
        $this->params->update("location", Selection::getValue('villa_location', $location));


        return new ReportMapper("Contract Master List", $this->params->toArray(), $rows["data"]);
    }
}
