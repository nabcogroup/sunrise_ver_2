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


        $villas = Villa::where("location", "sv1")->orderBy("villa_no")->get();

        $transactions = [];
        foreach ($villas as $villa) {
            $dailyRate = $villa->daily_rate;
            $contracts = $villa->contracts()->orderBy("period_start")->get()
                ->map(function ($contract) use($year) {
                    //filter only within the year
                    if(Carbon::parse($contract->period_start)->year <= $year &&  Carbon::parse($contract->period_end)->year >= $year) {
                        $node = (object)[
                            "contract_no"   =>  $contract->contract_no,
                            "period_start"  =>  Carbon::parse($contract->period_start),
                            "period_end"    =>  Carbon::parse($contract->period_end_extended),
                            "status"        =>  $contract->status
                        ];

                        if($contract->isTerminated()) {
                            $contractTermination = $contract->contractTerminations()->first();
                            $node->period_term_end = $contractTermination->date_termination;
                        }
                        else if($contract->isCompleted()) {
                            $node->period_term_end = Carbon::parse($contract->period_end);
                        }
                        else {
                            $node->period_term_end = Carbon::parse($contract->period_end);
                        }

                        return $node;
                    }
                    else {
                        return null;
                    }

                })->toArray();

            if(!is_null($contracts) && count($contracts)> 0) {

                if(count($contracts) > 1) {
                    //two transaction exist in one period
                    //check status
                    for($i = 0;$i < count($contracts); $i++) {
                        if(!is_null($contracts[$i])) {
                            //between two gaps
                            if (isset($contracts[$i + 1]) && !is_null($contracts[$i + 1])) {

                                if($contracts[$i]->period_term_end->month < $contracts[$i + 1]->period_start->month) {

                                    for($v = $contracts[$i]->period_term_end->month; $v <= $contracts[$i + 1]->period_start->month; $v++) {

                                        $totalRate = $villa->rate_per_month;

                                        if($v == $contracts[$i]->period_term_end->month) {

                                            $totalDayDiff = $contracts[$i]->period_term_end->endOfMonth()->day - $contracts[$i]->period_term_end->day;

                                            $totalRate = $dailyRate * $totalDayDiff;
                                        }
                                        else if($v == $contracts[$i + 1]->period_start->month) {

                                            $totalDayDiff = $contracts[$i + 1]->period_start->day - 1;

                                            $totalRate = $dailyRate * $totalDayDiff;

                                        }

                                        $contracts[$i]->periods[] = [$v => $totalRate];
                                    }
                                }
                                else {
                                    if($contracts[$i]->status != "active") {

                                        $yearEnd = Carbon::createFromDate($year, $month_from, 31);

                                        if($contracts[$i]->period_term_end->month > $yearEnd->month) {
                                            $gaps = $contracts[$i]->period_term_end->diffInDays($yearEnd);

                                        }



                                    }






                                    $contracts[$i]->periods[] = [$contracts[$i]->period_term_end->month ]

                                }
                            }
                            //tail period
                            else {

                                //create carbon
                                $yearEnd = Carbon::createFromDate($year, 12, 31);

                                if($contracts[$i]->period_term_end->month < $yearEnd->month) {

                                    $contracts[$i]->start_month_connection = [$contracts[$i]->period_term_end->month => $contracts[$i]->period_term_end->day - 30];

                                    $contracts[$i]->end_month_connection = [$yearEnd->month => 0];
                                }
                            }

                        }
                    }
                }
                else {

                    //create carbon
                    $yearEnd = Carbon::createFromDate($year, 12, 31);

                    if($contracts[0]->period_term_end->month < $yearEnd->month) {

                        $contracts[0]->start_month_connection = [$contracts[0]->period_term_end->month => $contracts[0]->period_term_end->day - 30];

                        $contracts[0]->end_month_connection = [$yearEnd->month => 0];
                    }
                }
            }


            $transactions[$villa->villa_no] = $contracts;
        }



        return new ReportMapper("Loss Of Rent",$this->params->toArray() ,$transactions);

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
        //       }
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
        if ($report_type == "per_property") {
            $key = "location";
            $title = "Summary of Property: Loss of Rent Report";
        } else {
            $recordset = $recordset->where("location", $location);
            $villas = $villas->where("location", $location);
            $key = "villa_no";
            $title = "Villa Loss of Rent Report - " . Selection::getValue("villa_location", $location);
        }

        $recordset = $recordset->get();
        $villas = $villas->select("villa_no", "location", "status", "rate_per_month", "rent_commencement")->orderBy("villa_no")->get();

        $profit_loss = [];
        foreach ($villas as $villa) {

            $date_commencement = $villa->rent_commencement;
            for ($i = $month_from; $i <= $month_to; $i++) {
                //check if no transaction found in the occuring month
                $isExist = $recordset->contains(function ($value, $key) use ($villa, $i) {
                    return $villa->villa_no == $value->villa_no && $value->monthly_schedule == $i;
                });

                //not exist means no transaction
                //but check the commencement of transaction
                if (!$isExist) {
                    if ($date_commencement) {
                        //should be greater than commencement data
                        // formula: SR <= TR <= CY
                        if ($date_commencement->year <= (int)$year && $date_commencement->month <= $i) {
                            //transaction started onward
                            array_value_handling($profit_loss[$villa->{$key}][$i], $villa->rate_per_month, true);
                        } else {
                            array_value_handling($profit_loss[$villa->{$key}][$i], 0);
                        }
                    } else {
                        array_value_handling($profit_loss[$villa->{$key}][$i], 0);
                    }
                } else {
                    array_value_handling($profit_loss[$villa->{$key}][$i], 0);
                }
            }
        }


        return new ReportMapper($title, $this->params->toArray(), $profit_loss);

    }
}