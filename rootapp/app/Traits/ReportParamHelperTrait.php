<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/14/2017
 * Time: 10:01 AM
 */

namespace App\Traits;


use Carbon\Carbon;
use KielPack\LaraLibs\Supports\Facades\Result;


trait ReportParamHelperTrait
{

    public static function createDropdowns($label, $model, $selection, $value = "code", $text = "name", $default_text = '--SELECT--', $default = '', $actions = null)
    {

        $params = [
            "label" => $label,
            "type" => "dropdown",
            "model" => $model,
            "selection" => $selection,
            "value" => $value,
            "text" => $text,
            "default_text" => $default_text,
            "default" => $default
        ];

        if (!is_null($actions)) {
            $params["action"] = $actions;
        }

        return $params;
    }


    public static function createInput($label, $model, $type = "text", $placeholder = "")
    {

        $params = [
            "label" => $label,
            "model" => $model,
            "type" => $type,
            "placeholder" => $placeholder
        ];

        return $params;
    }

    public static function createMonthLookup($label = "Month From", $model = "month_from")
    {
        $params = [
            "label" => $label,
            "type" => "dropdown",
            "model" => $model,
            "selection" => "months",
            "value" => "code",
            "text" => "name",
            "default_text" => "",
            "default" => ""
        ];

        return $params;
    }

    public static function createMonthModel(Carbon $date,$endOfMonth = false)
    {
        if($endOfMonth) {
            return Carbon::createFromDate($date->year,$date->month,1)->addMonth()->subDay();
        }
        else {
            return Carbon::createFromDate($date->year,$date->month,1);
        }

    }

    public static function createYearFromDropdown($label, $model, $selection, $value = "code", $text = "name", $default_text = '--SELECT--', $default = '', $actions = null) {
        try {
           
            $params = [
                "label" => $label,
                "type" => "dropdown",
                "model" => $modelName,
                "selection" => $selection,
                "value" => $value,
                "text" => $text,
                "default_text" => $default_text,
                "default" => $default
            ];

        }
        catch(Exception $e) {
            Result::badRequest(["errors" => $e->getMessage()]);
        }
        
    }
}