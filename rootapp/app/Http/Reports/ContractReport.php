<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:36 AM
 */

namespace App\Http\Reports;



use App\Http\Datasource\ContractExpiring;
use App\Http\Datasource\ContractPending;
use App\Http\Datasource\ContractValue;

class ContractValueReport extends BaseReport
{
    private $reportName;
    private $templateSource;

    public function __construct($params,$reportName = 'value')
    {
        if($reportName == 'value') {
            $this->dataSource = new ContractValue($params);
            $this->templateSource = "contract-value";
        }
        else if($reportName == 'pending') {
            $this->dataSource = new ContractPending();
            $this->templateSource = "contract-pending";
        }
        else if($reportName == 'expiry') {
            $this->dataSource = new ContractExpiring();
            $this->templateSource = "contract-expiring";
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


    public function getLookups()
    {
        $lookups = [
            'statuses' => [
                ['code' => 'pending','name' => 'Pending'],
                ['code' => 'active','name' => 'Active'],
            ],
        ];

        return $lookups;
    }
}