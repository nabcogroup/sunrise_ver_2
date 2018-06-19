<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/31/2018
 * Time: 11:35 AM
 */

namespace Reports\app\Commands;


use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportParameter;

class ReportCommand
{

    protected $dataSource = null;
    protected $reportParameter = null;

    public function __construct(IDataSource $dataSource)
    {
        $this->dataSource = $dataSource;
    }

    public function execute() {

        return $this->dataSource->execute();
    }
}