<?php

use Accounting\AccountingRoute;

/*
|--------------------------------------------------------------------------
| Admin Utility
|--------------------------------------------------------------------------
*/




Route::group(['prefix' => "admin"], function () {

    AdminRoute::routes();

});


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

/*
    |--------------------------------------------------------------------------
    | User Web Routes
    |--------------------------------------------------------------------------
    */
Route::get("register/edit/{id}", "Auth\RegisterController@edit")->name('user.edit');
Route::post("register/update", "Auth\RegisterController@update")->name('user.update');


/********************************************************
 * Dashboard
 ***********************************************************/
Route::get('/', "DashboardController@index")->middleware('auth')->name("dashboard");
Route::get('/api/about', "HomeController@apiInfo");

/*
|--------------------------------------------------------------------------
| Villa Web Routes
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth', 'roles'], 'roles' => ['contract', 'admin']], function () {

    Route::get('villa/', "VillaController@index")->name('villa.manage');
    Route::get('villa/register/{id?}', "VillaController@register")->name('villa.register');
    Route::get('villa/image/{fileName}', "VillaController@imageSource");

    Route::get('api/villa/list', "VillaController@apiList");
    Route::get('api/villa/create/{id?}', "VillaController@apiCreate");
    Route::post('api/villa/store', "VillaController@apiStore");

});

/*
|--------------------------------------------------------------------------
| Contract Web Routes
|--------------------------------------------------------------------------
*/
Route::group(["middleware" => ["auth", "roles"], "roles" => ["contract"]], function () {

    Route::get('contract/', "ContractController@index")->name('contract.manage');
    Route::get('contract/register', "ContractController@register")->name('contract.create');
    Route::get('contract/show/{id}', "ContractController@show")->name('contract.show');
    Route::get('contract/calendar', "ContractController@calendar")->name('contract.calendar');

    Route::get('api/contract/list/{status?}', "ContractController@apiGetList");
    Route::get('api/contract/create', "ContractController@apiCreate");
    Route::get('api/contract/renew/{id}', "ContractController@apiRenew");
    Route::get('api/contract/calendar', "ContractController@apiCalendar");

    Route::post('api/contract/recalc', "ContractController@apiRecalc");
    Route::post('api/contract/store', "ContractController@apiStore");
    Route::post('api/contract/cancel', "ContractController@apiCancel");
    Route::post('api/contract/renew', "ContractController@apiUpdate");
    Route::post('api/contract/terminate', "ContractController@apiTerminate");
});

/*
|--------------------------------------------------------------------------
| Bill Web Routes
|--------------------------------------------------------------------------
*/
Route::group(["middleware" => ["auth", "roles"], "roles" => ["account"]], function () {

    Route::get('bill/', ["uses" => "ContractBillController@index", "roles" => ["account"]])->name('bill.index');
    Route::get('bill/create/{contractNo}', ["uses" => "ContractBillController@create", "roles" => ["contract", "account"]])->name('bill.create');
    Route::get('bill/show/{billNo}', ["uses" => "ContractBillController@show", "roles" => ["contract", "account"]])->name('bill.show');
    Route::get('bill/edit/{billNo?}', ["uses" => "ContractBillController@edit", "roles" => ["account"]])->name('bill.edit');

    Route::get('api/bill/list', ["uses" => "ContractBillController@apiGetList", "roles" => ["account"]]);
    Route::get('api/bill/create/{contractNo}', ["uses" => "ContractBillController@apiCreate", "roles" => ["contract", "account"]]);
    Route::post('api/bill/store', ["uses" => "ContractBillController@apiStore", "roles" => ["contract", "account"]]);
    Route::get('api/bill/edit/{billNo?}', ["uses" => "ContractBillController@apiEdit", "roles" => ["account"]]);
    Route::post('api/bill/update', ["uses" => "ContractBillController@apiUpdate", "roles" => ["account"]]);
    Route::get('api/bill/search/{filter?}/{value?}', ["uses" => "ContractBillController@apiSearch", "roles" => ["account"]]);
    Route::get('api/bill/get_balance_total',["uses" => "ContractBillController@apiGetTotalBalance","roles" => ["account"]]);

});


/*
|--------------------------------------------------------------------------
| Account Chart Web Routes
|--------------------------------------------------------------------------
*/
Route::group(["middleware" => ["auth", "roles"], "roles" => ["account", "admin"]], function () {



    Route::post("api/chart/store", "AccountChartController@store");
    Route::post("api/chart/update", "AccountChartController@store");

    Route::get("api/chart/create", "AccountChartController@create");
    Route::get("api/chart/{id}/edit", "AccountChartController@edit");
    Route::get("api/chart/", "AccountChartController@all");

});


/*
|--------------------------------------------------------------------------
| Property Web Routes
|--------------------------------------------------------------------------
*/
Route::group(["middleware" => ["auth", "roles"], "roles" => ["account", "admin"]], function () {

    Route::get("api/property", "PropertyController@all");

});


/*
|--------------------------------------------------------------------------
| Fixed Asset Web Routes
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth', 'roles'], 'roles' => ['account', 'admin']],
    function () {

        Route::get('fixed-asset/', 'FixedAssetController@index');
        Route::get('fixed-asset/register/{id?}', 'FixedAssetController@register');


        Route::get("api/fixed-asset/create", "FixedAssetController@create");
        Route::get("api/fixed-asset/edit/{id}", "FixedAssetController@edit");
        Route::get("api/fixed-asset/{property?}", "FixedAssetController@all");
        Route::post("api/fixed-asset/store", "FixedAssetController@store");
        Route::post("api/fixed-asset/update", "FixedAssetController@store");

    }
);


/*
|--------------------------------------------------------------------------
| Accounts Web Routes
|--------------------------------------------------------------------------
*/
Route::group(["middleware" => ["auth", "roles"], "roles" => ["account"]],
    function () {



        Route::get("payee/create","PayeeController@register");
        Route::get("payee/edit/{id}", "PayeeController@edit");
        Route::get("payee", "PayeeController@index");

        Route::get("/chart/register/{id?}", "AccountChartController@register");
        Route::get("/chart/", "AccountChartController@index");

        Route::get("expenses/", "ExpenditureController@register");


        
        AccountingRoute::routes();

//

//
//        Route::get("expenses/{id}", "ExpenditureController@edit");
//
//        Route::get("api/expenses/create", "ExpenditureController@apiCreate");
//
//        Route::post("api/expenses/store", "ExpenditureController@apiStore");
//        Route::post("api/expenses/update", "ExpenditureController@apiStore");
//        Route::get("api/expenses/edit/{id}", "ExpenditureController@apiEdit");
//        Route::get("api/expenses/{property?}", "ExpenditureController@apiGetAll");
    }
);

//
///********************************************************
// * Payee
// ***********************************************************/
//Route::group(['prefix' => 'api/payee', 'middleware' => ['auth', 'roles']], function () {
//
//    Route::post("/store", ["uses" => "PayeeController@apiStore", "roles" => ["account"]]);
//
//    Route::get("/create", ["uses" => "PayeeController@apiCreate", "roles" => ["account"]]);
//
//    Route::get("/list", ["uses" => "PayeeController@apiList", "roles" => ["account"]]);
//});


/********************************************************
 * Report
 ***********************************************************/
Route::group(['prefix' => 'reports','middleware' => ['auth', 'roles']], function () {

    Route::get("/", ["uses" => "ReportController@index", "roles" => ["contract", "account", "admin"]]);
    Route::get("/{reportId}", ["uses" => "ReportController@show", "roles" => ["contract", "account", "admin"]]);

});

Route::group(['prefix' => 'api/reports', 'middleware' => ['auth', 'roles']], function () {
    Route::get("/lookups/{reportId}", ["uses" => "ReportController@apiLookups", "roles" => ["contract", "account", "admin"]]);
});

/********************************************************
 * Tenant
 ***********************************************************/
Route::group(['prefix' => 'tenant', 'middleware' => ['auth', 'roles']], function () {

    Route::get("/", ["uses" => "TenantController@index", "roles" => ["contract", "account", "admin"]]);

    Route::get("/register/{tenantId?}", ["uses" => "TenantController@register", "roles" => ["contract", "account", "admin"]]);
});

Route::group(['prefix' => 'api/tenant', 'middleware' => ['auth', 'roles']], function () {

    Route::get("/list", ["uses" => "TenantController@apiList", "roles" => ["contract", "account", "admin"]]);

    Route::get("/edit/{tenantId}", ["uses" => "TenantController@apiShow", "roles" => ["contract", "account", "admin"]]);

    Route::get("/search/{regId?}", ["uses" => "TenantController@apiSearch", "roles" => ["contract", "account", "admin"]]);

    Route::post("/store", ["uses" => "TenantController@apiStore", "roles" => ["contract", "account", "admin"]]);

});


/********************************************************
 * Management
 ***********************************************************/
Route::group(['prefix' => 'management', 'middleware' => ['auth', 'roles']], function () {
    Route::get("/","ManagementController@index");
});
