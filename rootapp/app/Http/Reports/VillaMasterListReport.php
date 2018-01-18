<?php

namespace App\Http\Reports;

use App\Http\Datasource\Villas\VillaMasterMainDatasource;
use App\Http\Reports\BaseReport;
use App\Http\Datasource\Villas\VillaMasterlist;
use App\Selection;


class VillaMasterListReport extends BaseReport {


    public function __construct($params) {
        
        $this->dataSource = new VillaMasterMainDatasource($params);  //VillaMasterlist($params);

        $this->templateSource = "villa.masterlist";
    }


    public function isPdfRender()
    {
        return false;
    }

    public function isApi() {
        return false;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_status"]);
        return $lookups;
    }

}