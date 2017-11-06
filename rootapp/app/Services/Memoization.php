<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 11/6/2017
 * Time: 11:50 AM
 */

namespace App\Services;


class Memoization
{
    protected static $memoizations = [];

    public static function addValues($key,$values) {
        if(!isset(self::$memoizations[$key])) {
            self::$memoizations[$key] = $values;
        }
    }

    public static function getValues($key) {
        return (isset(self::$memoizations[$key])) ? self::$memoizations[$key] : false;
    }

    public static function isExist($key) {
        return (isset(self::$memoizations[$key])) ? true : false;
    }


}