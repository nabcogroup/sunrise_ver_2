<?php


namespace App\Http\Reports;


use App\Http\Datasource\Villas\VillaSalesProjection;
use App\Selection;
use App\Traits\HelperTrait;

class VillaSalesProjectionReport extends BaseReport {

    use HelperTrait;


    public function __construct($params)
    {
        $this->dataSource = new VillaSalesProjection($params);

        $this->templateSource = "sales.sales_projection";

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


        $lookups["report_type"] = [ ["code" => "property", "name" => "Per Property"],["code" => "", "name" => "Per Villa"]];

        return $lookups;
    }
}
{

}