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

    public function sum($items,$field) {
        $total = 0;
        if(is_array($items)) {
            foreach($items as $item) {
                
                if(is_object($item) && is_numeric($item->{$field})) {
                    $total += floatval($item->{$field});
                }
                else if(is_numeric($item[$field])) {
                    $total += floatval($item[$field]);
                }
            }
        }
        return $total;
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

    public function calculateTotal(Array $fields,$fieldName = 'amount') {
        $totalAmount = 0;
        if (sizeof($fields) > 0) { 
            foreach ($fields as $field) {
                $totalAmount += (float)$field[$fieldName];
            }
        }
        return $totalAmount;
            
    }

    public function getDiff($value1,$value2) {
        $total_value_1 = $value1 == null ? 0 : floatval($value1);
        $total_value_2 = $value2 == null ? 0 : floatval($value2);
        $diff = floatval($total_value_1) - floatval($total_value_2);
        return $diff;
    }


    public function getMonthLookups() {
        return [
                [ "code" => "1", "name" => "January"],
                [ "code" => "2", "name" =>"February"],
                [ "code" => "3", "name" => "March" ],
                [ "code" => "4", "name" => "April" ],
                [ "code" => "5", "name" => "May" ],
                [ "code" => "6", "name" => "June" ],
                [ "code" => "7", "name" => "July" ],
                [ "code" => "8", "name" => "August" ],
                [ "code" => "9", "name" => "September"],
                ["code" => "10","name" => "October"],
                ["code" => "11","name" => "November"],
                ["code" => "12","name" => "December"],
           ];
        
    }

}