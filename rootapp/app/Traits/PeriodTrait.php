<?php 


namespace App\Traits;

use Carbon\Carbon;

trait PeriodTrait {

    public function getDiffDays() {

         return Carbon::parse($this->period_start)->diffInDays(Carbon::parse($this->period_end),true);
    }

    public function getRemainingPeriod() {

        $endPeriod = Carbon::parse($this->period_end);
        $remaining = $endPeriod->diffInDays(Carbon::now());

        return $remaining;

    }

    public function setDefaultPeriod(Carbon $startPeriod, $default, $extraPeriod = 0) {

        $this->period_start = $startPeriod->toDateTimeString();
        $this->period_end = $startPeriod->addMonth($default)->addDay(-1)->toDateTimeString();
    }

    public function setPeriod($periodStart, $periodEnd)
    {
        $this->period_start = $periodStart;
        $this->period_end = $periodEnd;
    }

  



}