<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 11:01 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\Expenses\ExpensesMaster;
use App\Selection;
use App\Villa;

class ExpenseMasterReport extends BaseReport
{

    public function __construct($params)
    {
        $this->dataSource = new ExpensesMaster($params);
        $this->templateSource = "expense.pre_prop";
    }


    public function isPdfRender()
    {
        return false;
    }


    public function getLookups()
    {
        $lookups = Selection::getSelections(["villa_location"]);
        $lookups['villas'] = [];

        $villas = Villa::select('id', 'villa_no')->orderBy('villa_no')->get();

        foreach ($villas as $villa) {
            $vdata = ['code' => $villa->id, 'name' => $villa->villa_no];
            array_push($lookups['villas'], $vdata);
        }

        return $lookups;
    }

    public function isApi()
    {
        return false;
    }
}