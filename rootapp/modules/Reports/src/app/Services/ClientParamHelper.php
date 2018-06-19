<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 6/3/2018
 * Time: 10:58 AM
 */

namespace Reports\app\Services;


class ClientParamHelper
{
    public static function createDropdown($label, $model, $selection, $value = "code", $text = "name", $default_text = '--SELECT--', $default = '', $actions = null)
    {

        $params = [
            "label" => $label,
            "model" => $model,
            "type" => "dropdown",
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

    public static function createMonthModel(Carbon $date,$endOfMonth = false)
    {
        if($endOfMonth) {
            return Carbon::createFromDate($date->year,$date->month,1)->addMonth()->subDay();
        }
        else {
            return Carbon::createFromDate($date->year,$date->month,1);
        }

    }

}