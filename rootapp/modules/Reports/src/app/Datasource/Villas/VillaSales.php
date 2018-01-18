<?php


namespace Reports\App\Datasource\Villas;


use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Traits\HelperTrait;
use App\Traits\QuerySoftDeleteTrait;

use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

class VillaSales implements IDataSource
{

    use QuerySoftDeleteTrait;
    
    use ArrayGroupTrait,HelperTrait;

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

        $report_type = $this->params->field("report_type","");

        if($report_type == "property") {

            $recordset = $this->createDb('villas')
                ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
                ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
                ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
                ->select("villas.location",
                    \DB::raw("YEAR(payments.effectivity_date) AS year_schedule"),
                    \DB::raw("MONTH(payments.effectivity_date) AS monthly_schedule"),
                    \DB::raw("SUM(payments.amount) AS monthly_payable"))
                ->groupBy(
                    "villas.location",
                    \DB::raw("MONTH(payments.effectivity_date)"),
                    \DB::raw("YEAR(payments.effectivity_date)"))
                ->whereNull("contracts.deleted_at")
                ->where("payments.status","clear")
                ->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)
                ->orderBy("villas.location")
                ->get();

            $groupSummary = $this->arrayGroupBy($recordset,null,["location","monthly_schedule"]);

            $title= "Summary of Property: Payment Collection Report";

        }
        else {

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
                    "payment_status")
                ->whereNull("contracts.deleted_at")
                ->where("villas.location",$location)
                ->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)
                ->orderBy("villas.villa_no")
                ->get();

            $groupSummary = $this->arrayGroupBy($recordset,null,["villa_no","monthly_schedule"]);

            $title = "Villa Payment Collection Report - ".Selection::getValue("villa_location",$location);

        }




        $this->params->update("location",\App\Selection::getValue("villa_location",$location));
        
        return new ReportMapper($title,$this->params->toArray(),$groupSummary);

    }

    public function lookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();
        $lookups["report_type"] = [ ["code" => "property", "name" => "Per Property"],["code" => "", "name" => "Per Villa"]];
        return $lookups;
    }
}