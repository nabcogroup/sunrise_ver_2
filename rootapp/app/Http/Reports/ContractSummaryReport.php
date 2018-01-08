<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/7/2018
 * Time: 10:08 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\Contracts\ContractSummary;

class ContractSummaryReport extends BaseReport
{

    public function __construct($params)
    {
        $this->dataSource = new ContractSummary($params);
        $this->templateSource = "contract.summary";

    }

    public function isPdfRender()
    {
        return false;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}