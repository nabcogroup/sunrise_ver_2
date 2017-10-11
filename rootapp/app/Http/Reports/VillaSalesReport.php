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
    }

    public function getTemplateSource()
    {
        return "villa-sales-analysis";
    }

    public function isPdfRender()
    {
        return false;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();
        return $lookups;
    }

    public function isApi()
    {
        return false;
    }
}