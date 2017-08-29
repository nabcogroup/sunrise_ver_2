<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/19/2017
 * Time: 7:38 PM
 */

namespace App\Traits;


use Carbon\Carbon;

trait HelperTrait
{


    public function calculatePayableAmount($period_start,$period_end,$amount) {

        $totalDays = Carbon::parse($period_start)->diffInDays(Carbon::parse($period_end));
        $totalAmountPerDays = $amount / intval($totalDays / 30);

        return $totalAmountPerDays;
    }

    public function calculateTotalYearMonth($period_start,$period_end) {

        $totalDays = (Carbon::parse($period_end)->diffInDays(Carbon::parse($period_start)));
        $totalMonths = floor($totalDays / 30);
        $totalRemaining = $totalMonths % 12;

        $totalYear = ($totalMonths - $totalRemaining) / 12;
        if ($totalRemaining > 0) {
            if ($totalYear > 0)
                return $totalYear . "." . $totalRemaining . " / " . $totalMonths;
            else
                return $totalYear . "." . $totalRemaining . " / " . $totalMonths;
        }
        else {
            return $totalYear . " / " . $totalMonths;
        }
    }

    public function convertYearToMonth($period_start,$period_end) {

    }

    public function formatUnderscore($value) {

        $underscore_pos = strpos("$value","_");
        if($underscore_pos) {
            $values = explode("_",$value);
            return ucfirst($values[0]) . " " . ucfirst($values[1]);
        }

        return $value;
    }

}