<?php


namespace App\Http\Datasource\Villas;

use App\Services\ReportService\ReportMapper;
use App\Traits\ArrayGroupTrait;
use App\Http\Datasource\IDataSource;
use App\Traits\QuerySoftDeleteTrait;


class VillaPaymentCollection implements IDataSource
{

    use QuerySoftDeleteTrait, ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;

    }

    public function execute()
    {

        $location = $this->params["location"];
        $year = $this->params["year"];
        $month_from = $this->params["month_from"];
        $month_to = $this->params["month_to"];


        $recordset = $this->createDb("villas")
            ->join("contracts", "contracts.villa_id", "villas.id")
            ->join("contract_bills", "contract_bills.contract_id", "contracts.id")
            ->join("payments", "payments.bill_id", "contract_bills.id")
            ->select("villas.villa_no",
                "payments.payment_type",
                \DB::raw("SUM(payments.amount) AS amount_deposited"),
                \DB::raw("MONTH(payments.date_deposited) AS month_deposited"),
                \DB::raw("(SELECT SUM(amount) FROM payments where status ='clear' AND bill_id = contract_bills.id) AS total_payable"))
            ->groupBy("villas.villa_no",
                "payment_type",
                \DB::raw("MONTH(payments.date_deposited)"))
            ->whereNull("contracts.deleted_at")
            ->where("villas.location", $location)
            ->where(\DB::raw("YEAR(payments.date_deposited)"), $year)
            ->whereBetween(\DB::raw("MONTH(payments.date_deposited)"), [$month_from, $month_to])
            ->orderBy("villas.villa_no")
            ->get();

        $payment_types = [];
        $groupSummary = $this->arrayGroupBy($recordset, function ($row) use (&$payment_types,$month_from,$month_to) {
            if (!isset($payment_types[$row->payment_type])) {
                $payment_types[$row->payment_type] = (int)$month_to - (int)$month_from;
            }
            return $row;
        }, ["villa_no", "payment_type", "month_deposited"]);

        $params = [
            "month_from" => $month_from,
            "month_to" => $month_to,
            "year" => $year,
            "location" => \App\Selection::getValue("villa_location", $location),
            "payment_types" => $payment_types
        ];

        return new ReportMapper("Payment Collection per Villa", $params, $groupSummary);
    }

}