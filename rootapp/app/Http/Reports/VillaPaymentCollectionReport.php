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
        return "villa_report.villa_payment_collection";
    }

    public function isPdfRender()
    {
       return false;
    }

    public function isApi()
    {
        return false;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}