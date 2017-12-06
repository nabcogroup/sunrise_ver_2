<?php

namespace Accounting\App\Http\Routes;


use Illuminate\Support\Facades\Route;

class AccountingRoute
{
    public static function routes() {

        Route::group(['prefix' => 'api/fixed-asset/'],
            
            function() {
                Route::post("store", "\Accounting\App\Http\Controllers\FixedAssetController@store");
                Route::get("create", "\Accounting\App\Http\Controllers\FixedAssetController@create");
                Route::get("show/{id}", "\Accounting\App\Http\Controllers\FixedAssetController@show");
                Route::get("{property?}", "\Accounting\App\Http\Controllers\FixedAssetController@all");
            }
        );
    }



}