<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:36 AM
 */

namespace App\Http\Reports;



use App\Http\Datasource\ContractActive;
use App\Http\Datasource\ContractExpiring;
use App\Http\Datasource\ContractPending;
use App\Http\Datasource\ContractValue;
use App\Selection;

class ContractReport extends BaseReport
{
    private $reportName;
    private $templateSource;

    public function __construct($params,$reportName = 'value')
    {
        if($reportName == 'active') {
            $this->dataSource = new ContractActive();
            $this->templateSource = "contract-active";
        }
        else if($reportName == 'pending') {
            $this->dataSource = new ContractPending();
            $this->templateSource = "contract-pending";
        }
        else if($reportName == 'expiry') {
            $this->dataSource = new ContractExpiring($params);
            $this->templateSource = "contract-expiry";
        }
        else {
            $this->dataSource = new ContractValue($params);
            $this->templateSource = "contract-value";
        }

    }

    public function getTemplateSource()
    {
       return $this->templateSource;
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
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups['statuses'] = [
                ['code' => 'pending','name' => 'Pending'],
                ['code' => 'active','name' => 'Active'],
        ];

        return $lookups;
    }


}