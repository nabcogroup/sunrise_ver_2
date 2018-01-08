<?php 


namespace App\Http\Reports;

use App\Http\Datasource\Receivables\PaymentSchedule;
use App\Http\Reports\BaseReport;
use App\Selection;
use App\Traits\HelperTrait;


class ReceivableReport extends BaseReport {

    use HelperTrait;

    public function __construct($params)
    {
        $this->dataSource = new PaymentSchedule($params);

        if(is_object($params)) {
            if($params->field("report_type") == "per_property") {
                $this->templateSource = "receivable.property";
            }
            else {
                $this->templateSource = "receivable.schedule";
            }


        }


    }



    public function isPdfRender()
    {
        return false;
    }

    public function getLookups()
    {
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();
        $lookups["report_type"] = [
            ["code" => "per_property", "name" => "Per Property"],
            ["code" => "per_villa", "name" => "Per Villa"]
        ];
        return $lookups;
    }
}