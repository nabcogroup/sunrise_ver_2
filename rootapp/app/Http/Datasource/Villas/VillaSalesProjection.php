<?php

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Services\EDB;
use App\Services\ReportService\ReportMapper;
use App\Villa;
use Carbon\Carbon;

class VillaSalesProjection implements IDataSource
{

    protected $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {

        $year = $this->params->fieldInt("year", Carbon::now()->year);
        $report_type = $this->params->field("report_type", "");
        $location = $this->params->field("location", "sv1");
        $status = $this->params->field("status","");
        $month_from = 1;
        $month_to = 12;

        if ($report_type == "property") {
            $villas = Villa::where(\DB::raw('YEAR(rent_commencement)'), "<=", $year)->get();
            $key = "location";
        }
        else {
            $villas = Villa::where("location",$location)->where(\DB::raw('YEAR(rent_commencement)'), "<=", $year)->get();
            $key = "villa_no";
        }


        $villas = $villas->pipe(
            function ($collection) use ($key,$year, $month_from, $month_to,$status) {
                $data = [];
                foreach ($collection as $item) {
                    //get contracts
                    $query = EDB::createQuery("contracts")
                        ->joins(["contract_bills" => "contracts.id=contract_bills.contract_id"])
                        ->joins(["payments" => "payments.bill_id=contract_bills.id"])
                        ->self($this->params);

                    $query = $query
                        ->where("contracts.villa_id", $item->getId())
                        ->where(\DB::raw("YEAR(payments.effectivity_date)"), $year)
                        ->distinct()
                        ->select("contracts.contract_no", "payments.effectivity_date", "payments.status", "payments.amount")->get();

                    for ($i = $month_from; $i <= $month_to; $i++) {

                        $payment_amount = $query->filter(function ($value, $key) use($i) {
                            return Carbon::parse($value->effectivity_date)->month == $i;
                        })->sum(function($q) use($status) {
                            return ($q->status == "clear" && $q->amount == 0) ? 1 : $q->amount;
                        });



                        if ($status == "active") {
                            if($payment_amount == 1) $payment_amount = 0;
                            $payment_amount = floatval(($payment_amount <= 0) ? 0 : $payment_amount);
                        }
                        else if($status == "loss") {
                            $payment_amount = floatval(($payment_amount > 0) ? 0 : $item->rate_per_month);
                        }
                        else {
                            if($payment_amount == 1) {
                                $payment_amount = floatval(($payment_amount <= 0) ? $item->rate_per_month : 0);
                            }
                            else {
                                $payment_amount = floatval(($payment_amount <= 0) ? $item->rate_per_month : $payment_amount);
                            }
                        }

                        //evaluate only when commencement started in the stated year
                        if (Carbon::parse($item->rent_commencement)->year == $year) {

                            if ($i >= Carbon::parse($item->rent_commencement)->month) {

                                array_value_handling($data[$item->{$key}][$i], $payment_amount, true);

                            }
                            else {

                                array_value_handling($data[$item->{$key}][$i], 0, true);

                            }

                        }
                        else if (Carbon::parse($item->rent_commencement)->year < $year) {

                            array_value_handling($data[$item->{$key}][$i], $payment_amount, true);

                        }
                        else {

                            array_value_handling($data[$item->{$key}][$i], 0, true);

                        }
                    }
                }

                return $data;
            });

        $title = "Property Sales Projection Report";

        $this->params->add("month_from", $month_from);
        $this->params->add("month_to", $month_to);

        return new ReportMapper($title, $this->params->toArray(), $villas);


    }
}