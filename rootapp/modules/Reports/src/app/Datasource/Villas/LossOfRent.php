<?php


namespace Reports\App\Datasource\Villas;




use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;
use App\Villa;
use Carbon\Carbon;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

class LossOfRent implements IDataSource
{
    use QuerySoftDeleteTrait,
        ArrayGroupTrait;


    private $params;

    public function __construct($params)
    {
        $this->params = $params;

    }

    private function calculate_head_month(&$periods, Carbon $period_start,$totalRate,$totalDialyRate,$year) {


        //create carbon
        $begMonth = Carbon::createFromDate($year, 1, 31);
        if ($period_start->month == $begMonth->month) {

            $totalDayDiff = $period_start->day - 1;

            $gapRate = $totalDialyRate * $totalDayDiff;

            $periods[to_month_name($period_start->month)] = $gapRate;

        } else {

            for ($i = $begMonth->month; $i <= $period_start->month; $i++) {

                $dailyRate = $totalRate;

                if ($i == $period_start->month) {
                    $totalDayDiff = $period_start->day - 1;
                    $dailyRate = $totalDialyRate * $totalDayDiff;
                }
                $periods[to_month_name($i)] = $dailyRate;
            }
        }

    }

    private function calculate_tail_month(&$periods, Carbon $period_end,$totalRate,$totalDailyRate,$year) {

        //create carbon
        $yearEnd = Carbon::createFromDate($year, 12, 1);
        if ($period_end->month == $yearEnd->month) {

            $totalDayDiff = $period_end->diffInDays($yearEnd->endOfMonth(), false);

            $gapRate = $totalDailyRate * $totalDayDiff;

            $periods[to_month_name($period_end->month)] = $gapRate;

        }
        else {

            for ($i = $period_end->month; $i <= $yearEnd->month; $i++) {

                $dailyRate = $totalRate;

                if ($i == $period_end->month) {
                    $month_term_end = Carbon::createFromDate($year,$period_end->month,1);
                    $totalDayDiff = $period_end->diffInDays($month_term_end->endOfMonth());

                    $dailyRate = $totalDailyRate * $totalDayDiff;
                }

                $periods[to_month_name($i)] = $dailyRate;

            }
        }

    }

    private function calculate_between_gap(Carbon $period_head,$period_tail,$rate) {

        $totalDayDiff = $period_head->diffInDays($period_tail, false) - 1;
        if($totalDayDiff < 0) {
            $totalDayDiff = 0;
        }

        return  $rate * $totalDayDiff;

    }

    private function calculate_gap_month(Carbon $prev_date,Carbon $pres_date,$rate,$is_full_gap = false) {
        $periods = [];
        for ($v = $prev_date->month; $v <= $pres_date->month; $v++) {

            $totalRate = $rate;

            if(!$is_full_gap) {
                if ($v == $pres_date->month) {
                    $totalDayDiff = $pres_date->day - 1;
                    $totalRate = $totalRate * $totalDayDiff;
                }
            }
            else {
                //check the previous
                if ($v == $prev_date->month) {

                    $totalDayDiff = $prev_date->endOfMonth()->day - $prev_date->day;

                    $totalRate = $totalRate * $totalDayDiff;

                }
                else if ($v == $pres_date->month) {

                    $totalDayDiff = $pres_date->day - 1;

                    $totalRate = $totalRate * $totalDayDiff;

                }
            }

            $periods[to_month_name($v)] = $totalRate;
        }




    }

    public function execute()
    {
        $location = $this->params->field("location", "sv1");
        $year = $this->params->field("year", \Carbon\Carbon::now()->year);
        $month_from = $this->params->fieldInt("month_from", 0);
        $month_to = $this->params->fieldInt("month_to", 0);
        $report_type = $this->params->field("report_type", "");


        if($report_type == "property") {
            $villas = Villa::orderBy("location")->get();
            $key = "location";
        }
        else {
            $villas = Villa::where("location", $location)->orderBy("villa_no")->get();
            $key = "villa_no";
        }

        $transactions = [];
        foreach ($villas as $villa) {

            $periods = [];
            $contracts = $villa->contracts()->orderBy("period_start")->get()
                ->map(function ($contract) use ($year, $villa) {
                    //filter only within the year
                    if (Carbon::parse($contract->period_start)->year <= $year && Carbon::parse($contract->period_end)->year >= $year) {
                        $node = (object)[
                            "contract_no" => $contract->contract_no,
                            "period_start" => Carbon::parse($contract->period_start),
                            "period_end" => Carbon::parse($contract->period_end_extended),
                            "rent_commencement" => $villa->rent_commencement,
                            "status" => $contract->status
                        ];

                        if ($contract->isTerminated()) {
                            $contractTermination = $contract->contractTerminations()->first();
                            $node->period_term_end = $contractTermination->date_termination;
                        } else if ($contract->isCompleted()) {
                            $node->period_term_end = Carbon::parse($contract->period_end);
                        } else {
                            $node->period_term_end = Carbon::parse($contract->period_end);
                        }

                        return $node;
                    } else {
                        return null;
                    }

                })->toArray();



            if (!is_null($contracts) && count($contracts) > 0) {

                //check if more than one contract
                if (count($contracts) > 1) {
                    //two transaction exist in one period
                    //check status
                    for ($i = 0; $i < count($contracts); $i++) {

                        $totalRate = $villa->daily_rate; //total rate

                        if (!is_null($contracts[$i])) {

                            //check the head first
                            if (!isset($contracts[$i - 1]) || is_null($contracts[$i - 1])) {
                                //found head

                                $isCoallision = false;

                                //only one transaction
                                //calculate both head and tail
                                if ($villa->rent_commencement->diffInDays($contracts[$i]->period_start) <= 0) $isCoallision = true;

                                if ($contracts[$i]->period_start->year < $year) $isCoallision = true;

                                if (!$isCoallision) {
                                    $this->calculate_head_month($periods, $contracts[$i]->period_start,$villa->rate_per_month,$totalRate,$year);
                                }

                            }


                            //between body gaps
                            if (isset($contracts[$i + 1]) && !is_null($contracts[$i + 1])) {

                                if ($contracts[$i]->period_term_end->month == $contracts[$i + 1]->period_start->month) {
//                                    $totalDayDiff = $contracts[$i]->period_term_end->diffInDays($contracts[$i + 1]->period_start, false) - 1;
//                                    $gapRate = $totalRate * $totalDayDiff;
                                    $periods[to_month_name($contracts[$i]->period_term_end->month)] = $this->calculate_between_gap($contracts[$i]->period_term_end,$contracts[$i + 1]->period_start,$totalRate);
                                }
                                else {

                                    for ($v = $contracts[$i]->period_term_end->month; $v <= $contracts[$i + 1]->period_start->month; $v++) {


                                        $totalRate = $villa->rate_per_month;

                                        if ($v == $contracts[$i]->period_term_end->month) {

                                            $month_term_end = Carbon::createFromDate($year,$contracts[$i]->period_term_end->month,1);

                                            $totalDayDiff =  $month_term_end->endOfMonth()->day - $contracts[$i]->period_term_end->day;

                                            if($totalDayDiff < 0) {
                                                $totalDayDiff = 0;
                                            }

                                            $totalRate = $villa->daily_rate;

                                            $totalRate = $totalRate * $totalDayDiff;

                                        } else if ($v == $contracts[$i + 1]->period_start->month) {

                                            $totalDayDiff = $contracts[$i + 1]->period_start->day - 1;

                                            $totalRate = $villa->daily_rate;
                                            $totalRate = $totalRate * $totalDayDiff;
                                        }

                                        $periods[to_month_name($v)] = $totalRate;
                                    }

                                }


                            } //tail period
                            else {

                                $isCoallision = false;

                                if ($contracts[$i]->period_term_end->year > $year) $isCoallision = true;

                                if (!$isCoallision) {

                                    $this->calculate_tail_month($periods,$contracts[$i]->period_term_end,$villa->rate_per_month,$totalRate,$year);
                                }


                            }

                        }
                    }
                } //only one contract
                else {
                    //only one transaction
                    //calculate both head and tail

                    $isCoallision = false;
                    $totalRate = $villa->daily_rate;

                    if(is_null($contracts[0])) continue;

                    //calculate the head
                    if ($villa->rent_commencement->diffInDays($contracts[0]->period_start) <= 0) $isCoallision = true;

                    if ($contracts[0]->period_start->year < $year) $isCoallision = true;


                    if (!$isCoallision) {

                        $this->calculate_head_month($periods,$contracts[0]->period_start,$villa->rate_per_month,$totalRate,$year);
                    }

                    $isCoallision = false;

                    if ($contracts[0]->period_term_end->year > $year) $isCoallision = true;


                    if (!$isCoallision) {
                        $this->calculate_tail_month($periods,$contracts[0]->period_term_end,$villa->rate_per_month,$totalRate,$year);
                    }
                }
            }


            $transactions[$villa->villa_no] = ['location' => $villa->location, 'contracts' => $contracts, 'periods' => $periods];
        }

        if($report_type == "property") {

            $properties = [];

            foreach ($transactions as $villas) {
                $periods = $villas["periods"];

                foreach ($periods as $key => $value) {

                    array_value_handling($properties[$villas["location"]]["periods"][$key], floatval($value),true);
                }
            }

            $transactions = $properties;

            $title = "Property Loss of Rental Income Report";

        }
        else {
            $title = "Loss of Rental Income - " . Selection::getValue("villa_location",$location);
        }

        return new ReportMapper($title, $this->params->toArray(), $transactions);


    }

    public function lookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups["months"] = $this->getMonthLookups();
        $lookups["report_type"] = [ ["code" => "property", "name" => "Per Property"],["code" => "", "name" => "Per Villa"]];

        return $lookups;
    }
}



