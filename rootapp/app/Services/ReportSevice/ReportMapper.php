<?php

namespace App\Services\ReportService;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;


class ReportMapper {


    protected $mappers;

    public function __construct($title,$params,$data) {
        
        $this->mappers = [
            "title"     =>  $title,
            "params"    =>  $params,
            "data"      =>  $data
        ];
    }



    public function toJson() {
        return response()->json($this->mappers);
    }

    public function getTitle() {
        return isset($this->mappers["title"]) ? $this->mappers["title"] : "";
    }

    public function getParam($name) {
        return isset($this->mappers["params"][$name]) ? $this->mappers["params"][$name] : "";
    }

    public function getParamDate($name,$format = null) {
        return Carbon::parse($this->mappers["params"][$name]);
    }

    public function getParams() {
        return $this->mappers["params"];
    }

    public function getParamInt($name) {
        return (int)$this->mappers["params"][$name];
    }


    public function getData() {
        return $this->mappers["data"];
    }

    
}