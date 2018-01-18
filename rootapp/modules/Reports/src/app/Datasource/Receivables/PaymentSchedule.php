<?php


namespace Reports\App\Datasource\Receivables;


use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Traits\HelperTrait;
use App\Traits\QuerySoftDeleteTrait;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

class PaymentSchedule implements IDataSource
{
    use QuerySoftDeleteTrait;

    use ArrayGroupTrait,HelperTrait;

    private $params;


    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $month_from = $this->params->field("month_from",Carbon::now()->month);
        $month_to = $this->params->field("month_to",Carbon::now()->addMonth()->month);

        $location = $this->params->field("location","");
        $year = $this->params->field("year",Carbon::now()->year);
        $report_type = $this->params->field("report_type","");

        $prev_year = $year - 1;

        if($report_type == "property") {

            $rows = $this->createDb('villas')
                ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
                ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
                ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
                ->select("villas.location",
                    \DB::raw("YEAR(payments.effectivity_date) AS year_schedule"),
                    \DB::raw("MONTH(payments.effectivity_date) AS monthly_schedule"),
                    \DB::raw("SUM(payments.amount) AS monthly_payable"))
                ->groupBy(
                    "villas.location",
                    \DB::raw("MONTH(payments.effectivity_date)"),
                    \DB::raw("YEAR(payments.effectivity_date)"))
                ->whereNull("contracts.deleted_at")
                ->whereIn("payments.status",["received","pending_case"])
                ->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)
                ->orderBy("villas.location")
                ->get()
                ->pipe(function($collection) {
                    $items = [];
                    foreach ($collection as $item) {
                        if(!isset($items[$item->location])) {
                            $items[$item->location] = [
                                "begbal" => 0,
                                "periods" => [$item->monthly_schedule => $item]
                            ];
                        }
                        else {
                            array_push($items[$item->location]["periods"], $item);
                        }
                    }

                    return $items;

                });



            $title = "Summary of Property: Payment Receivable Report";


        }
        else {

            //create two queries
            $recordset = $this->createDb('villas')
                ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
                ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
                ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
                ->select("villas.villa_no",
                    "payments.status AS payment_status",
                    \DB::raw("YEAR(payments.effectivity_date) AS year_schedule"),
                    \DB::raw("MONTH(payments.effectivity_date) AS monthly_schedule"),
                    \DB::raw("SUM(payments.amount) AS monthly_payable"))
                ->groupBy(
                    "villas.villa_no",
                    \DB::raw("MONTH(payments.effectivity_date)"),
                    \DB::raw("YEAR(payments.effectivity_date)"),
                    "payment_status")
                ->whereNull("contracts.deleted_at")
                ->whereIn("payments.status",["received","deposited","pending_case"])
                ->where("villas.location",$location)
                ->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)
                ->orderBy("villas.villa_no")
                ->get();

            $title = "Villa Payment Receivable Report - " . Selection::getValue("villa_location",$location);
            $rows = $this->arrayGroupBy($recordset, null,["villa_no","monthly_schedule"]);
        }

        



        $column_month = [];
        $this->params->update("location",Selection::getValue('villa_location', $location));

        return new ReportMapper($title,$this->params->toArray(),$rows);



    }


    public function lookups()
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