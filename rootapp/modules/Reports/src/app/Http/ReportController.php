<?php

namespace Reports\App\Http\Controllers;


use PDF;
use Illuminate\Http\Request;
use App\Services\ReportService\ReportMapper;

use \KielPack\LaraLibs\Base\Controller as KielPackController;
use Reports\App\Services\ReportManager;
use Reports\App\Services\ReportParameter;

class ReportController extends KielPackController
{

    public function index() {

        $reportList = ReportManager::getReportList();

        $params = ReportManager::getParameter();

        //return compact('reportList','lookups'); 
        return view('reports::index',compact('reportList','params'));

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


//        if($report->isApi()) {
//            return $datasource;
//        }
//        else if($report->isPdfRender()) {
//
//            PDF::setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif']);
//            $dompdf = PDF::loadView('reports.modules.'.$template, compact('datasource'));
//
//            return $dompdf->stream();
//        }
//        else {
//            return view('reports::modules.'.$template, compact('datasource'));
//        }

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
