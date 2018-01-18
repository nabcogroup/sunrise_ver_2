<?php

namespace Reports\App\Datasource\Villas;

use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;
use Carbon\Carbon;
use Reports\App\Datasource\IDataSource;


class PropertySummary implements IDataSource {

    use QuerySoftDeleteTrait, 
        ArrayGroupTrait;
    
    private $params;

    public function __construct($params) {

        $this->params = $params;

    }

    public function execute() {

        $month_from = $this->params->fieldInt("month_from");

        $month_to = $this->params->fieldInt("month_to");

        $year = $this->params->fieldInt("year");

        $recordset = $this->createDb("villas")
            ->join("contracts","contracts.villa_id","=","villas.id")
            ->select(
                "villas.location AS villa_location",
                \DB::raw("COUNT(contracts.id) as total_count"),
                \DB::raw("MONTH(contracts.period_start) as period_start_month"))
            ->groupBy(
                "villa_location",
                "period_start_month")
            ->whereNull("contracts.deleted_at")
            ->where(\DB::raw("YEAR(contracts.period_start)"),$year)
            ->orderBy("villas.location")
            ->get();

        $groupSummary = $this->arrayGroupBy($recordset,function($row) use (&$colHeader) {
            $item = (object)[
                "villa_location"    =>  $row->villa_location,
                "total_count"       =>  $row->total_count,
                "period_start_month" =>  $row->period_start_month];

            return $item;

        },["villa_location","period_start_month"]);
        

        return new ReportMapper("Property Contract Summary Report",$this->params->toArray(),$groupSummary);

    }
}