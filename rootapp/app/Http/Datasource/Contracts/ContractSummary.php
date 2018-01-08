<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/7/2018
 * Time: 9:52 AM
 */

namespace App\Http\Datasource\Contracts;


use App\Http\Datasource\IDataSource;
use App\Selection;
use App\Services\ReportService\ReportMapper;
use App\Traits\QuerySoftDeleteTrait;
use App\Villa;
use Carbon\Carbon;

class ContractSummary implements IDataSource
{
    use QuerySoftDeleteTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        $location = $this->params->field("location");
        $report_type = $this->params->field("report_type");
        $year = $this->params->field("year");

        $month_from = 1;
        $month_to = 12;


        if($report_type == "per_property") {
            $villas = Villa::orderBy("villa_no");
        }
        else {
            $villas = Villa::where("location",$location)->orderBy("villa_no");
        }

        $villas = $villas->get()
            ->pipe(function ($collections) use ($year, $month_from, $month_to) {
                $items = [];
                foreach ($collections as $collection) {
                    $item = [
                        "id" => $collection->id,
                        "location" => $collection->location,
                        "villa_no" => $collection->villa_no,
                        "periods" => [],
                        "contracts" => $collection->contracts()->where(\DB::raw("YEAR(period_start)"), $year)->get()
                    ];

                    for ($i = $month_from; $i <= $month_to; $i++) {
                        $period = [$i => $item["contracts"]->sum(function ($row) use ($i) {
                            return (Carbon::parse($row->period_start)->month == $i) ? $row->amount : 0;
                        })];
                        array_push($item["periods"], $period);
                    }

                    $item["total_contracts_value"] = $item["contracts"]->sum("amount");

                    array_push($items, $item);

                }

                return $items;

            });

        if ($report_type == "per_property") {

            $property_items = [];

            array_walk($villas,function($item) use(&$property_items) {
                if(!isset($property_items[$item["location"]])) {
                    $property_items[$item["location"]] = ["periods" => []];
                }

                $property_item = &$property_items[$item["location"]];
                foreach ($item["periods"] as $period) {
                    foreach ($period as $key => $value) {
                        array_value_handling($property_item["periods"][$key],$value,true);
                    }
                }
            });

            $title = "Summary of Property: Contract Value Summary";
            $data = $property_items;
        }
        else {
            $title = "Contract Value Summary - ".Selection::getValue("villa_location",$location);
            $data = $villas;
        }

        $this->params->add("month_from",$month_from);
        $this->params->add("month_to",$month_to);


        return new ReportMapper($title, $this->params->toArray(), $data);


    }
}