<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/5/2017
 * Time: 11:33 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\Bank\BankDeposit;

class BankReport extends BaseReport
{


    public function __construct($params)
    {
        $this->dataSource = new BankDeposit($params);
    }

    public function getTemplateSource()
    {
        return "bank-account";
    }

    public function isPdfRender()
    {
        return false;
    }


    public function isApi()
    {
        return true;
    }

    public function getLookups()
    {
        // TODO: Implement getLookups() method.
    }
}