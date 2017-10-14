<?php 


namespace App\Http\Reports;

use App\Http\Datasource\Villas\VillaPaymentCollection;
use App\Selection;
use App\Traits\HelperTrait;

class VillaPaymentCollectionReport extends BaseReport {

    use HelperTrait;


    public function __construct($params)
    {
        $this->dataSource = new VillaPaymentCollection($params);
        $this->templateSource = "sales.collection";
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
        $lookups = Selection::getSelections(["villa_location","payment_term"]);
        $lookups["months"] = $this->getMonthLookups();

        return $lookups;
    }
}