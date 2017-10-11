<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/11/2017
 * Time: 12:38 PM
 */

namespace App\Services\ReportService;


use Carbon\Carbon;

class ReportParameter
{
    private $params;

    public function __construct($params = array())
    {
        $this->params = $params;
    }

    public function field($name,$default = null) {
        return isset($this->params[$name]) ? (int)$this->params[$name] : $default;
    }

    public function fieldInt($name,$default = null) {
        return isset($this->params[$name]) ? (int)$this->params[$name] : $default;
    }

    public function fieldDate($name,$default = null) {
        return isset($this->params[$name]) ? Carbon::parse($this->params[$name]) : $default;
    }





}