<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:32 AM
 */

namespace App\Http\Reports;

abstract class BaseReport
{
    protected $dataSource;
    protected $params;
    protected $reportSource;
    protected $templateSource;

    public function execute() {
        return $this->dataSource->execute();
    }

    public abstract function isPdfRender();
    public abstract function getLookups();

    public function isApi() {
        return false;
    }

    public function getTemplateSource(){
        $report_view = config("appreport.view");
        $templateSources = explode(".",$this->templateSource);

        return $report_view[$templateSources[0]][$templateSources[1]];


    }

}