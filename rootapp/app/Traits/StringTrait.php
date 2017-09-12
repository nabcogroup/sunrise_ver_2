<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 6:48 PM
 */

namespace App\Traits;

trait StringTrait
{
    public function formatUnderscore($value) {

        $underscore_pos = strpos("$value","_");
        if($underscore_pos) {
            $values = explode("_",$value);
            return ucfirst($values[0]) . " " . ucfirst($values[1]);
        }

        return $value;
    }

}