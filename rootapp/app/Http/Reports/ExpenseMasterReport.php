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
use App\Traits\HelperTrait;
use App\Villa;

class ExpenseMasterReport extends BaseReport
{
    use HelperTrait;

    public function __construct($params)
    {
        $this->dataSource = new ExpensesMaster($params);
        $this->templateSource = "expense.pre_prop";
    }


    public function isPdfRender()
    {
        return false;
    }


    public function getLookups($args = [])
    {
        if(count($args) > 0) {
            if($args['source'] == 'villas') {
                $lookups['villas'] = Villa::where('location',$args['location'])->select('villa_no')->orderBy('villa_no')->get();
            }
        }
        else {
            // TODO: Implement getLookups() method.
            $lookups = Selection::getSelections(["villa_location"]);
            $lookups["months"] = $this->getMonthLookups();
            $lookups["report_type"] = [
                ["code" => "property", "name" => "Per Property"],
                ["code" => "", "name" => "Per Villa"]
            ];
        }

        return $lookups;

    }

    public function isApi()
    {
        return false;
    }
}