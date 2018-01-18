<?php

Route::get("reports/", ["uses" => "\Reports\App\Http\Controllers\ReportController@index", "roles" => ["contract", "account", "admin"]]);

Route::get("reports/{reportId}", ["uses" => "\Reports\App\Http\Controllers\ReportController@show", "roles" => ["contract", "account", "admin"]]);

Route::get("api/reports/lookups/{reportId}", ["uses" => "\Reports\App\Http\Controllers\ReportController@apiLookups", "roles" => ["contract", "account", "admin"]]);

