<?php


namespace App\Http\Reports;


use App\Http\Datasource\Villas\VillaSalesProjection;

class VillaSalesProjectionReport extends BaseReport {


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
    }
}
{

}