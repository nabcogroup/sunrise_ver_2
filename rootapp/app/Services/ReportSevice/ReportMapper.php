<?php

namespace App\Services\ReportService;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;


class ReportMapper {


    protected $mappers;

    public function __construct($title,$params,$data) {
        $params = [
                "title"     =>  $title,
                "params"    =>  $params,
                "data"      =>  $data
        ];

        $this->mappers = $params;
    }



    public function toJson() {

        return response()->json($this->mappers);

    }

    public function getTitle() {

        return $this->mappers["title"];

    }

    public function getParam($name,$default = null) {

        return (isset($this->mappers["params"][$name]) &&  !is_null($this->mappers["params"][$name])) ? $this->mappers["params"][$name] : $default;
        
    }

    public function getParamDate($name,$format = null) {
        $param = $this->getParam($name);
        if(!is_null($param)) {
            return Carbon::parse($param);
        }
        else {
            return $param;
        }
    }

    public function getParams() {
        return $this->mappers->params;
    }

    public function getParamInt($name) {
        return (int)$this->getParam($name,0);
    }


    public function getData() {
        return $this->mappers["data"];
    }

    public function hasData() {
        return sizeof($this->mappers["data"]) > 0 ? true: false;
    }

    public function checkParamNull() {
        
    }

    
}