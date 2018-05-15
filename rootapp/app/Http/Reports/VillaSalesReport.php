<?php

namespace App\Http\Reports;


use App\Selection;
use App\Traits\HelperTrait;
use App\Http\Datasource\Villas\VillaSales;
use App\Http\Datasource\Villas\PaymentSchedule;

class VillaSalesReport extends BaseReport
{
    use HelperTrait;

    private $reportName;

    public function __construct($params)
    {
        $this->dataSource = new VillaSales($params);

        if(is_object($params)) {
            if ($params->field("report_type","") == "per_property") {
                $this->templateSource = "sales.property";
            } else {
                $this->templateSource = "sales.analysis";
            }
        }
    }



    public function isPdfRender()
    {
        return false;
    }

    public function getLookups()
    {

        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();

        $lookups["report_type"] = [ ["code" => "per_property", "name" => "Per Property"],["code" => "per_villa", "name" => "Per Villa"]];

        return $lookups;
    }

    public function isApi()
    {
        return false;
    }
}