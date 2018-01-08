<?php


namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Selection;
use App\Services\ReportService\ReportMapper;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;
use App\Villa;
use Carbon\Carbon;

class VillaProfitLoss implements IDataSource
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
        $location = $this->params->field("location", "");
        $year = $this->params->field("year", \Carbon\Carbon::now()->year);
        $month_from = $this->params->fieldInt("month_from", 0);
        $month_to = $this->params->fieldInt("month_to", 0);
        $report_type = $this->params->field("report_type", "");

//        $villas = Villa::where("location",$location)->orderBy("villa_no")->get();
//        $transactions = [];
//        foreach($villas as $villa) {
//
//            $contracts = $villa->contracts()
//                            ->orderBy("period_end")
//                            ->get()
//                            ->pipe(function($collection) use($year) {
//                                $trans = [];
//                                foreach($collection as $contract) {
//                                    if(Carbon::parse($contract->period_start)->year <= $year &&
//                                        Carbon::parse($contract->period_end)->year >= $year) {
//
//                                        $contractNode = (object)[
//                                            "contract_no" => $contract->contract_no,
//                                            "period_start" => Carbon::parse($contract->period_start),
//                                            "period_end" => Carbon::parse($contract->period_end),
//                                            "beg_year"  => (Carbon::parse($contract->period_start)->year < $year)  ? Carbon::parse("2017/01/31") : Carbon::parse($contract->period_start),
//                                            "end_year"  => (Carbon::parse($contract->period_end)->year > $year) ? Carbon::parse("2017/12/31"): Carbon::parse($contract->period_end),
//                                            "status" => $contract->status];
//
//                                        if($contract->isTerminated()) {
//                                            $contractTermination = $contract->contractTerminations()->first();
//                                            if(Carbon::parse($contractTermination->created_at) >= $year) {
//                                                $contractNode->end_year = Carbon::parse($contractTermination->created_at);
//                                            }
//                                            else {
//                                                $contractNode->beg_year = null;
//                                                $contractNode->end_year = null;
//                                            }
//                                        }
//                                        array_push($trans,$contractNode);
//                                    }
//
//                                }
//
//                                return $trans;
//
//                            });
//            $d[$villa->villa_no] = $contracts;
//            for($i = $month_from; $i <= $month_to; $i++) {
//                $monthExist = false;
//                foreach ($contracts as $contract) {
//                    if(!is_null($contract->beg_year) && !is_null($contract->end_year)) {
//                        if ($i <= $contract->end_year->month && $i >= $contract->beg_year->month) {
//                            $monthExist = true;
//                            break;
//                        }
//                    }
//                }
//
//                if(!$monthExist) {
//
//                    if(!isset($transactions[$villa->villa_no])) {
//                        $transactions[$villa->villa_no] = [[$i => true]];
//                    }
//                    else {
//                        array_push($transactions[$villa->villa_no], [$i => true]);
//                    }
//                }
//                else {
//
//                }
//            }
//
//            //ranges[1] =
//            //$transactions[$villa->villa_no] = $contracts;
//        }
//        dd($d);
//        return $transactions;

        //create two queries
        $recordset = $this->createDb('villas')
            ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->select("villas.villa_no",
                "payments.status AS payment_status",
                "villas.rate_per_month",
                \DB::raw("YEAR(payments.effectivity_date) AS year_schedule"),
                \DB::raw("MONTH(payments.effectivity_date) AS monthly_schedule"),
                \DB::raw("SUM(payments.amount) AS monthly_payable"),
                \DB::raw("(SELECT SUM(amount) FROM payments where status ='clear' AND bill_id = contract_bills.id) AS total_payable"))
            ->groupBy(
                "villas.villa_no",
                \DB::raw("MONTH(payments.effectivity_date)"),
                \DB::raw("YEAR(payments.effectivity_date)"),
                "payment_status")
            ->whereNull("contracts.deleted_at")
            ->where(\DB::raw("YEAR(payments.effectivity_date)"), $year)
            ->whereIn("payments.status", ["clear", "received"])
            ->orderBy("villas.villa_no");

        //get the all villa first
        $villas = Villa::orderBy('location');
        if($report_type == "per_property") {
            $key = "location";
            $title = "Summary of Property: Loss of Rent Report";
        }
        else {
            $recordset = $recordset->where("location", $location);
            $villas = $villas->where("location", $location);
            $key = "villa_no";
            $title = "Villa Loss of Rent Report - ".Selection::getValue("villa_location",$location);
        }

        $recordset = $recordset->get();
        $villas = $villas->select("villa_no","location","status","rate_per_month","rent_commencement")->orderBy("villa_no")->get();

        $profit_loss = [];
        foreach ($villas as $villa) {

            $date_commencement = $villa->rent_commencement;
            for ($i = $month_from; $i <= $month_to; $i++)
            {
                //check if no transaction found in the occuring month
                $isExist = $recordset->contains(function ($value, $key) use ($villa, $i) {
                    return $villa->villa_no == $value->villa_no && $value->monthly_schedule == $i;
                });

                //not exist means no transaction
                //but check the commencement of transaction
                if (!$isExist) {
                    if($date_commencement) {
                        //should be greater than commencement data
                        // formula: SR <= TR <= CY
                        if($date_commencement->year <= (int)$year && $date_commencement->month <= $i) {
                            //transaction started onward
                            array_value_handling($profit_loss[$villa->{$key}][$i],$villa->rate_per_month,true);
                        }
                        else {
                            array_value_handling($profit_loss[$villa->{$key}][$i],0);
                        }
                    }
                    else {
                        array_value_handling($profit_loss[$villa->{$key}][$i],0);
                    }
                }
                else {
                    array_value_handling($profit_loss[$villa->{$key}][$i],0);
                }
            }
        }



        return new ReportMapper($title, $this->params->toArray(), $profit_loss);

    }
}