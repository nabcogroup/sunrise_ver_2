<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:36 AM
 */

namespace App\Http\Reports;

use App\Http\Datasource\Contracts\ContractActive;
use App\Http\Datasource\Contracts\ContractExpiring;
use App\Http\Datasource\Contracts\ContractPending;
use App\Http\Datasource\Contracts\ContractValue;
use App\Http\Datasource\Contracts\PaymentSchedule;
use App\Selection;

class ContractReport extends BaseReport
{
    private $reportName;
    private $templateSource;

    public function __construct($params,$reportName = 'value')
    {
        if($reportName == 'active') {
            $this->dataSource = new ContractActive($params);
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
        else if($reportName == 'payment_schedule') {
            $this->dataSource = new PaymentSchedule($params);
            $this->templateSource = "payment-schedule";
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