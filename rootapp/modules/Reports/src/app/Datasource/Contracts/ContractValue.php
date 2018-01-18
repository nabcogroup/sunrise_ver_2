<?php

namespace Reports\App\Datasource\Contracts;


use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Traits\HelperTrait;
use App\Traits\QuerySoftDeleteTrait;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

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
                        ->join('contract_bills','contract_bills.contract_id','=','contracts.id')
                        ->orderBy('villas.villa_no')
                        ->select('villas.villa_no',
                            'contracts.contract_no',
                            'contracts.created_at',
                            'tenants.full_name',
                            'contracts.period_start',
                            'contracts.period_end',
                            'villas.rate_per_month',
                            \DB::raw("(SELECT SUM(amount) FROM payments WHERE payments.status = 'clear' AND bill_id = contract_bills.id) as total_payment"),
                            'contracts.amount',
                            'contracts.status'
                            );

        $recordset = $recordset->where('villas.location', $location);
        $recordset = $recordset->where(\DB::raw('YEAR(contracts.period_start)'),$contract_year);

        if (!is_null($contract_status)) {
            $recordset->where('contracts.status', $contract_status);
        } 
        else {
            $recordset->whereIn('contracts.status', ["terminated","active"]);
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
                'total_payment'       =>  number_format($row->total_payment,2),
                'total_balance'     =>  number_format(($row->amount - $row->total_payment),2),
                'contract_status'   =>  ucfirst($row->status)];

            return $item;

        });

        $title = ucwords($contract_status). " Contract Master List - ". Selection::getValue("villa_location",$location);
        $total_balance = $recordset->sum('amount') - $recordset->sum('total_payment');

        $this->params->add("total_value", $recordset->sum('amount'));
        $this->params->add("total_payment",$recordset->sum('total_payment'));

        $this->params->add("total_balance",$total_balance);

        $this->params->update("location", Selection::getValue('villa_location', $location));


        return new ReportMapper($title, $this->params->toArray(), $rows["data"]);
    }

    public function lookups()
    {
        $lookups = Selection::getSelections(["villa_location","contract_status"]);

        return $lookups;
    }
}
