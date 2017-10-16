<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/14/2017
 * Time: 12:09 PM
 */

namespace App\Services\ReportService;


class ReportViewer
{
    public static function createCustomHeader($rowHeaders = array()) {
        foreach($rowHeaders as $rowHeader) {
             $htmlTableRows[] = $rowHeader->create();
        }

        $htmlTableHead  = "<thead>".implode(",",$htmlTableRows)."</thead>";

        return $htmlTableRows;
    }

    public static function createRow($cols = array()) {
        return new RowHeader($cols);
    }

    public static function createCol($colValues,$callback = null) {
        return new ColHeader($colValues,$callback);
    }
}


class Header {

    private $htmlTableRows = [];


    public function __construct($rowHeaders)
    {
        foreach($rowHeaders as $rowHeader) {
            $this->htmlTableRows[] = $rowHeader->create();
        }
    }

    public function create($rowHeaders = array()) {

        $htmlTableHead  = "<thead>".implode(",",$this->htmlTableRows)."</thead>";

        return $htmlTableHead;
    }




}

class RowHeader {

    private $htmlTableRows = array();

    public function __construct($cols,$properties = "")
    {
        if(is_array($cols)) {
            foreach ($cols as $col) {
                $this->htmlTableRows[] = "<tr".$properties .">".$col->create()."<tr>";
            }
        }
        else if (is_callable($cols)) {
            $this->htmlTableRows[] = $cols();
        }
        else {
            $this->htmlTableRows[] = "<tr>".$col->create()."<tr>";
        }

    }

    public function create() {
        return implode("",$this->htmlTableRows);
    }
}


class ColHeader {

    private $htmlTableCols = array();

    public function __construct($colValues,$callback = null)
    {
        if(!is_array($colValues)) {
            foreach($colValue as $key => $value) {
                if(is_callable($callback)) {
                    $items = $callback($value,$key);
                    $this->htmlTableCols[] = "<th".$items['properties'].">".$items["value"]."</th>";
                }
                else {
                    $this->htmlTableCols[] = "<th".$value['properties'].">".$value["value"]."</th>";
                }

            }
        }
        else {
            $this->htmlTableCols[] = $colValues;
        }

    }

    public function create() {
        return implode("",$this->htmlTableCols);
    }
}