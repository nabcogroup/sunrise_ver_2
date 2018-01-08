<?php

namespace App\Http\Reports;

use App\Http\Reports\BaseReport;
use App\Http\Datasource\Villas\PropertySummary;
use App\Traits\HelperTrait;

class PropertyReport extends BaseReport {
    
    use HelperTrait;

    public function __construct($params) {

        $this->dataSource = new PropertySummary($params);
        $this->templateSource = "villa.property";

    }

    public function isPdfRender()
    {
        return false;
    }

    public function getLookups() {


        $lookups["months"] = $this->getMonthLookups();

        return $lookups;

    }
}