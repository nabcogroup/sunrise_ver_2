<?php

namespace App\Services;

use Carbon\Carbon;

class PaymentScheduleGeneratorService
{

    private $args;
    private $schedules = [];

    public function __construct($args)
    {
        $this->args = $args;
    }


    public function create($callback = null)
    {

        $due_date = $this->args["effectivity_date"];
        $total_month = $this->args["total_month"];
        $payment_no = $this->args["payment_no"];
        $schedule_increment = isset($this->args["schedule_increment"]) ?  $this->args["schedule_increment"] : 1;
        $payment_increment = isset($this->args["payment_increment"]) ?  $this->args["payment_increment"] : 1;

        $period_start = Carbon::parse($this->args["period_start"]);
        $period_end = Carbon::parse($this->args["period_start"])->addMonth($schedule_increment);

        for ($i = 0; $i < $total_month; $i++) {
            $schedule = [
                "effectivity_date"              =>  $due_date->toDateString(),
                "payment_no"            =>  $payment_no,
                "amount"     =>  floatval($this->args["amount"]),
                "period_start"          =>  $period_start->toDateString(),
                "period_end"            =>  $period_end->subDay()->toDateString(),
            ];

            if(is_callable($callback)) {
                $callback($schedule);
            }

            $period_start = $period_start->addMonth($schedule_increment);
            $period_end = Carbon::parse($period_start->toDateString())->addMonth();
            $due_date = $due_date->addMonth($schedule_increment);
            if(is_numeric($payment_no)) {
                $payment_no += $payment_increment;
            }

            array_push($this->schedules,$schedule);

        }
    }

    public function getSchedules() {
        return $this->schedules;
    }
}
