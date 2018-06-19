<?php

namespace Reports\App\Http\Controllers;

use KielPack\LaraLibs\Supports\Result;
use PDF;
use Illuminate\Http\Request;
use App\Services\ReportService\ReportMapper;

use \KielPack\LaraLibs\Base\Controller as KielPackController;
use Reports\App\Services\ReportManager;
use Reports\App\Services\ReportParameter;

class ReportController extends KielPackController
{
    public function index() {

        $reportList = ReportManager::getClients();

        return Result::response(['data' => $reportList]);
    }

    public function showEntry(Request $request) {

        $reportName = $request->get('report_name');



    }

    public function apiLookups($reportId) {

        $report = ReportManager::get($reportId,[]);

        return $report->datasource->getLookups();
    }

    public function show($reportId,Request $request) {

        $params = new ReportParameter($request);

        $report = ReportManager::get($reportId,$params);

        $datasource = $report->datasource->execute();

        $template = $report->template;

        return view('reports::'.$template, compact('datasource'));
    }

    public function apiShow($reportId,Request $request) {
        
        $params = new ReportParameter($request);

        $report = ReportManager::get($reportId,$params);
        $datasource = $report->execute();
        
        if($datasource instanceof ReportMapper) {
            return $datasource->toJson();
        }
        else {
            return $datasource;
        }
    }

    

}
