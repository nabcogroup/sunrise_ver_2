<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/7/2018
 * Time: 9:52 AM
 */

namespace App\Http\Datasource\Contracts;


use App\Contract;
use App\Http\Datasource\IDataSource;
use App\Selection;
use App\Services\EDB;
use App\Services\ReportService\ReportMapper;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;
use App\Villa;
use Carbon\Carbon;

class ContractSummary implements IDataSource
{
    use QuerySoftDeleteTrait,
        ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $location = $this->params->field("location");

        $year = $this->params->field("year");

        $report_type = $this->params->field("report_type");

        $contract_status = $this->params->field("contract_status","");

        $month_from = 1;

        $month_to = 12;

        $model = EDB::createQuery("contracts")

            ->joins(["villas" => "villas.id=contracts.villa_id"])

            ->withSoftDelete("contracts")->self($this->params);


        if($report_type == "per_property") {

            $model = $model->select(\DB::raw("SUM(contracts.amount) contract_value"),"villas.location",\DB::raw("MONTH(contracts.period_start) as start_month"))
                    ->groupBy("villas.location","start_month");

            $groups = ["location","start_month"];
            $title = " Summary of Property: ".ucwords($contract_status)." Contract Value Summary";

        }
        else {

            $model = $model->where("location",$location)
                ->groupBy("villas.location", "villas.villa_no","start_month")
                ->select(\DB::raw("SUM(contracts.amount) contract_value"),"villas.location","villas.villa_no", \DB::raw("MONTH(contracts.period_start) as start_month"));

            $groups = ["villa_no", "start_month"];
            $title = ucwords($contract_status) ." Contract Value Summary - ".Selection::getValue("villa_location",$location);

        }

        $model->where(\DB::raw("YEAR(period_start)"),$year);

        if(!empty($contract_status)) {
            if($contract_status == 'active') {
                $model = $model->where("contracts.status",$contract_status);
            }
            else {
                $model = $model->whereIn("contracts.status",["terminated","completed"]);
            }


        }

        $model = $model->get();

        $data = $this->arrayGroupBy($model,null,$groups);

        $this->params->add("month_from",$month_from);
        $this->params->add("month_to",$month_to);

        return new ReportMapper($title, $this->params->toArray(), $data);


    }
}