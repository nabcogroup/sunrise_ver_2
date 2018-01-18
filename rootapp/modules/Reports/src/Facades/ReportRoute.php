<?php


namespace Reports\Facades;


use Illuminate\Support\Facades\Facade;

class ReportRoute extends  Facade
{

    protected static function getFacadeAccessor()
    {
        return 'reportRoute';
    }

}