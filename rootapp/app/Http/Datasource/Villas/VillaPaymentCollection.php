<?php


namespace App\Http\Datasource\Villas;

use Carbon\Carbon;
use App\Traits\ArrayGroupTrait;
use App\Http\Datasource\IDataSource;
use App\Traits\QuerySoftDeleteTrait;
use App\Services\ReportService\ReportMapper;


class VillaPaymentCollection implements IDataSource
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

        $date_month_from = Carbon::createFromDate($this->params->field("year"),$this->params->field("month_from"),1);
        $date_month_to = Carbon::createFromDate($this->params->field("year"),$this->params->field("month_to"),1)->addMonth()->subDay();

        $recordset = $this->createDb("villas")
            ->join("contracts", "contracts.villa_id", "villas.id")
            ->join("contract_bills", "contract_bills.contract_id", "contracts.id")
            ->join("payments", "payments.bill_id", "contract_bills.id")
            ->select("villas.villa_no",
                "payments.payment_type",
                \DB::raw("SUM(payments.amount) AS amount_deposited"),
                \DB::raw("MONTH(payments.date_deposited) AS month_deposited"))
            ->groupBy("villas.villa_no",
                "payment_type",
                \DB::raw("MONTH(payments.date_deposited)"))
            ->whereNull("contracts.deleted_at")
            ->where("villas.location", $this->params->field("location",""))
            ->where("payments.payment_type",$this->params->field("payment_type"))
            ->where("payments.status","clear")
            ->whereBetween(\DB::raw("payments.date_deposited"), [$date_month_from,$date_month_to])
            ->orderBy("villas.villa_no")
            ->get();

        $payment_types = [];
        $month_from = $this->params->field("month_from");
        $month_to = $this->params->field("month_to");

        $groupSummary = $this->arrayGroupBy($recordset, function ($row) use (&$payment_types,$month_from,$month_to) {
            if (!isset($payment_types[$row->payment_type])) {
                $payment_types[$row->payment_type] = (int)$month_to - (int)$month_from;
            }
            return $row;
        }, ["villa_no", "payment_type", "month_deposited"]);

      
        $this->params->update("location",\App\Selection::getValue("villa_location", $this->params->field("location")));
        $this->params->add("payment_types",$payment_types);
        
        return new ReportMapper("Payment Collection per Villa", $this->params->toArray(), $groupSummary);
    }

}