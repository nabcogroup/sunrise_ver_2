<?php



namespace App\Http\Reports;

use App\Http\Datasource\Contracts\ContractActive;
use App\Http\Datasource\Contracts\ContractExpiring;
use App\Http\Datasource\Contracts\ContractPending;
use App\Http\Datasource\Contracts\ContractValue;
use App\Http\Datasource\Receivables\PaymentSchedule;
use App\Selection;

class ContractReport extends BaseReport
{
    private $reportName;


    public function __construct($params,$reportName = 'value')
    {
        if($reportName == 'active') {
            $this->dataSource = new ContractActive($params);
            $this->templateSource = "contract.active";
        }
        else if($reportName == 'pending') {
            $this->dataSource = new ContractPending();
            $this->templateSource = "contract.pending";
        }
        else if($reportName == 'expiry') {
            $this->dataSource = new ContractExpiring($params);
            $this->templateSource = "contract.expiry";
        }
        else {
            $this->dataSource = new ContractValue($params);
            $this->templateSource = "contract.value";
        }
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
        $lookups = Selection::getSelections(["villa_location","contract_status"]);
        

        return $lookups;
    }


}