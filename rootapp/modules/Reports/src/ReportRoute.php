<?php

namespace Reports;


class ReportRoute
{
    public static function routes() {

        $route = __DIR__ . '/../routes/web.php';
        if(fileExists($route)) {
            require ($route);
        }
    }
}