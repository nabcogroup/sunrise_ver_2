<?php

namespace Accounting\App\Http\Routes;


use Illuminate\Support\Facades\Route;

class AccountingRoute
{
    public static function routes()
    {

        $namespace = "\Accounting\App\Http\Controllers";

//        Route::group(['prefix' => 'api/fixed-asset/'],
//
//            function() {
//                Route::post("store", "\Accounting\App\Http\Controllers\FixedAssetController@store");
//                Route::get("create", "\Accounting\App\Http\Controllers\FixedAssetController@create");
//                Route::get("show/{id}", "\Accounting\App\Http\Controllers\FixedAssetController@show");
//                Route::get("{property?}", "\Accounting\App\Http\Controllers\FixedAssetController@all");
//            }
//        );

        Route::group(['prefix' => 'api/expenses'], function () use($namespace) {

            Route::get("/", $namespace . "\ExpensesController@index");
            Route::get("create",  $namespace ."\ExpensesController@create");
            Route::post("store", $namespace . "\ExpensesController@store");
            Route::get("edit/{transaction_no}", $namespace . "\ExpensesController@edit");

        });

        //payee
        Route::group(['prefix' => 'api/payee'],function() use($namespace) {

            Route::get("/list", $namespace . "\AccountsPayeeController@index");
            Route::get("/create",$namespace . "\AccountsPayeeController@create");
            Route::post("/store", $namespace . "\AccountsPayeeController@store");
            Route::get('/edit/{id}',$namespace . "\AccountsPayeeController@edit");
            Route::patch('/update',$namespace . "\AccountsPayeeController@update");

        });

        //accounts
        Route::group(['prefix' => 'api/chart'],function() use ($namespace) {

            Route::get("/", $namespace . "\AccountChartController@index");
            Route::get("/create", $namespace . "\AccountChartController@create");
            Route::post("/store", $namespace . "\AccountChartController@store");
            Route::get("/{id}/edit", $namespace . "\AccountChartController@edit");
            Route::patch("/update", $namespace . "\AccountChartController@update");

        });

    }


}