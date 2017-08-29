<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:56 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\VillaSales;

class VillaSalesReport extends BaseReport
{

    public function __construct($params)
    {
        $this->dataSource = new VillaSales($params);
    }

    public function getTemplateSource()
    {
        return "villa-sales";
    }

    public function isPdfRender()
    {
        return false;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
        return [];
    }
}