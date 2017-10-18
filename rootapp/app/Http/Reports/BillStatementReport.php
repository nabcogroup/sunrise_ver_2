<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/16/2017
 * Time: 10:37 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\Receivables\BillStatement;

class BillStatementReport extends BaseReport
{

    public function __construct($params)
    {
        $this->dataSource = new BillStatement($params);
        $this->templateSource = "receivable.statement";
    }

    public function isPdfRender()
    {
        return true;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}