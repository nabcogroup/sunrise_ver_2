<?php 


namespace App\Http\Reports;

use App\Http\Datasource\Villas\VillaPaymentCollection;

class VillaPaymentCollectionReport extends BaseReport {


    public function __construct($params)
    {
        $this->dataSource = new VillaPaymentCollection($params);
    }

    public function getTemplateSource()
    {
        return "";
    }

    public function isPdfRender()
    {
       return false;
    }

    public function isApi()
    {
        return true;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}