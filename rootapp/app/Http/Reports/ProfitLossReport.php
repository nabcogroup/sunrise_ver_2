<?php

namespace App\Http\Reports;

use App\Http\Datasource\Villas\LossOfRent;
use App\Http\Datasource\Villas\VillaProfitLoss;
use App\Selection;
use App\Traits\HelperTrait;

class ProfitLossReport extends BaseReport
{
    use HelperTrait;

    public function __construct($params) {

        $this->dataSource = new VillaProfitLoss($params);
        $this->templateSource = "sales.loss_of_rent";

    }
    public function isPdfRender()
    {
        // TODO: Implement isPdfRender() method.
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();
        $lookups["report_type"] = [ ["code" => "property", "name" => "Per Property"],["code" => "", "name" => "Per Villa"]];

        return $lookups;
    }
}