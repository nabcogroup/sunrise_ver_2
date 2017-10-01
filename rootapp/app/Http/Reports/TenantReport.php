<?php


namespace App\Http\Reports;



use App\Http\Datasource\Tenants\TenantHistory;

class TenantReport extends BaseReport {
    
    public function __construct($params) {
        $this->dataSource = new TenantHistory($params);
    }

    public function getTemplateSource()
    {
        return "tenant-history";
    }

    public function isPdfRender() {
        return false;
    }

    public function isApi() {

        return false;

    }


    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}