<?php


namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Services\ReportService\ReportMapper;

use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;

class VillaSales implements IDataSource
{

    use QuerySoftDeleteTrait;
    
    use ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {   
        $month_from = $this->params->fieldInt("month_from",0);
        $month_to = $this->params->fieldInt("month_to",0);
        $location = $this->params->field("location","");
        $year = $this->params->field("year",\Carbon\Carbon::now()->year);
        
        //create two queries
        $recordset = $this->createDb('villas')
            ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->select("villas.villa_no",
                "payments.status AS payment_status",
                \DB::raw("YEAR(payments.effectivity_date) AS year_schedule"),
                \DB::raw("MONTH(payments.effectivity_date) AS monthly_schedule"),
                \DB::raw("SUM(payments.amount) AS monthly_payable"),
                \DB::raw("(SELECT SUM(amount) FROM payments where status ='clear' AND bill_id = contract_bills.id) AS total_payable"))
            ->groupBy(
                "villas.villa_no",
                \DB::raw("MONTH(payments.effectivity_date)"),
                \DB::raw("YEAR(payments.effectivity_date)"),
                "payments.status")
            ->whereNull("contracts.deleted_at")
            ->where("villas.location",$location)
            ->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)
            ->orderBy("villas.villa_no")
            ->get();

        $groupSummary = $this->arrayGroupBy($recordset,null,["villa_no","monthly_schedule"]);
        
        $this->params->update("location",\App\Selection::getValue("villa_location",$location));
        
        return new ReportMapper("Villa Sales Report",$this->params->toArray(),$groupSummary);

    }
}