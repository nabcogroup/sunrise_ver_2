<?php

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



/********************************************************
 * User
***********************************************************/
Route::group(['prefix' =>  "register"], function() {
        Route::get("/edit/{id}", "Auth\RegisterController@edit")->name('user.edit');
        Route::post("/update", "Auth\RegisterController@update")->name('user.update');
   
});


/********************************************************
 * Dashboard
 ***********************************************************/
Route::get('/', "DashboardController@index")->middleware('auth')->name("dashboard");
Route::get('/api/about', "HomeController@apiInfo");

/********************************************************
 * Villa
 ***********************************************************/
Route::group(['middleware' => ['auth','roles'],'roles' => ['contract']],function() {

    Route::get('villa/',"VillaController@index")->name('villa.manage');
    Route::get('villa/register/{id?}',"VillaController@register")->name('villa.register');
    Route::get('villa/image/{fileName}',"VillaController@imageSource");

    Route::get('api/villa/list',"VillaController@apiList");
    Route::get('api/villa/create/{id?}', "VillaController@apiCreate");
    Route::post('api/villa/store', "VillaController@apiStore");

});

/********************************************************
 * Contract
 ***********************************************************/
Route::group(["middleware" => ["auth","roles"],"roles" => ["contract"]],function() {

    Route::get('contract/',"ContractController@index")->name('contract.manage');
    Route::get('contract/register',"ContractController@register")->name('contract.create');
    Route::get('contract/show/{id}',"ContractController@show")->name('contract.show');
    Route::get('contract/calendar',"ContractController@calendar")->name('contract.calendar');

    Route::get('api/contract/list/{status?}',"ContractController@apiGetList");
    Route::get('api/contract/create', "ContractController@apiCreate");
    Route::get('api/contract/renew/{id}', "ContractController@apiRenew");
    Route::get('api/contract/calendar',"ContractController@apiCalendar");

    Route::post('api/contract/recalc',"ContractController@apiRecalc");
    Route::post('api/contract/store',"ContractController@apiStore");
    Route::post('api/contract/cancel', "ContractController@apiCancel");
    Route::post('api/contract/renew',"ContractController@apiUpdate");
    Route::post('api/contract/terminate',"ContractController@apiTerminate");
});

Route::group(["middleware" => ["auth","roles"],"roles" => ["admin"]], function() {
    Route::get('contract/extended',["uses" => "ContractController@apiUpdateExtended", "roles" => ["admin"]]);
});


/********************************************************
 * Bill
 ***********************************************************/
Route::group(['prefix' => 'bill', 'middleware' => ['auth','roles']],function() {
    Route::get('/',["uses" => "ContractBillController@index", "roles" => ["account"]])->name('bill.index');
    Route::get('/create/{contractNo}',["uses" => "ContractBillController@create", "roles" => ["contract","account"]])->name('bill.create');
    Route::get('/show/{billNo}',["uses" => "ContractBillController@show", "roles" => ["contract","account"]])->name('bill.show');
    Route::get('/edit/{billNo?}',["uses" => "ContractBillController@edit", "roles" => ["account"]])->name('bill.edit');
});

//bill api
Route::group(['prefix' => 'api/bill', 'middleware' => ['auth','roles']],function() {

    Route::get('/list',["uses" => "ContractBillController@apiGetList", "roles" => ["account"]]);
    Route::get('/create/{contractNo}',["uses" => "ContractBillController@apiCreate", "roles" => ["contract","account"]]);
    Route::post('/store',["uses" => "ContractBillController@apiStore", "roles" => ["contract","account"]]);
    Route::get('/edit/{billNo?}',["uses" => "ContractBillController@apiEdit","roles" => ["account"]]);
    Route::post('/update',["uses" => "ContractBillController@apiUpdate", "roles" => ["account"]]);
    Route::get('/search/{filter?}/{value?}',["uses" => "ContractBillController@apiSearch", "roles" => ["account"]]);

    Route::get('/prepare',"ContractBillController@apiPrepareCheques");

});


/********************************************************
 * Report
 ***********************************************************/
Route::group(['prefix' => 'reports', 'middleware' => ['auth','roles']],function() {
    Route::get("/",["uses" => "ReportController@index","roles" => ["contract","account"]]);
    Route::get("/{reportId}",["uses" => "ReportController@show","roles" => ["contract","account"]]);

});

Route::group(['prefix' => 'api/reports', 'middleware' => ['auth','roles']],function() {
    Route::get("/lookups/{reportId}",["uses" =>  "ReportController@apiLookups","roles" => ["contract","account"]]);
});

/********************************************************
 * Expenses
 ***********************************************************/
Route::group(['prefix' => 'expenses', 'middleware' => ['auth','roles']], function() {
    Route::get("/",["uses" => "ExpenditureController@index","roles" => ["account"] ]);
    Route::get("/create",["uses" => "ExpenditureController@register", "roles" => ["account"]]);
    Route::get("/edit/{id}",["uses" => "ExpenditureController@edit", "roles" => ["account"]]);
});

Route::group(['prefix' => 'api/expenses', 'middleware' => ['auth','roles']],function() {
    
    Route::get("/create",["uses" => "ExpenditureController@apiCreate", "roles" => ["account"] ]);
    Route::post("/store",["uses" => "ExpenditureController@apiStore", "roles" => ["account"]]);

    Route::get("/edit/{id}",["uses" => "ExpenditureController@apiEdit","roles" => ["account"]]);
    Route::get("/",["uses" => "ExpenditureController@apiGetAll","roles" => ["account"]]);

});


/********************************************************
 * Payee
 ***********************************************************/
Route::group(['prefix' => 'payee', 'middleware' => ['auth','roles']],function() {
    Route::get("/create",["uses" => "PayeeController@register","roles" => ["account"]]);
    Route::get("/", ["uses" => "PayeeController@index","roles" => ["account"]]);
});

Route::group(['prefix' => 'api/payee', 'middleware' => ['auth','roles']],function() {
    Route::post("/store",["uses" => "PayeeController@apiStore","roles" => ["account"]]);
    Route::get("/create", ["uses" => "PayeeController@apiCreate","roles" => ["account"]]);
    Route::get("/list", ["uses" => "PayeeController@apiList","roles" => ["account"]]);
});

/********************************************************
 * Tenant
 ***********************************************************/
Route::group(['prefix' => 'tenant', 'middleware' => ['auth','roles']],function() {
    Route::get("/",["uses" =>  "TenantController@index","roles" => ["contract", "account"]]);
    Route::get("/register/{tenantId?}",["uses" =>  "TenantController@register","roles" => ["contract", "account"]]);
});
Route::group(['prefix' => 'api/tenant', 'middleware' => ['auth','roles']],function() {

    Route::get("/list",["uses" =>  "TenantController@apiList","roles" => ["contract", "account"]]);
    Route::get("/edit/{tenantId}",["uses" =>  "TenantController@apiShow","roles" => ["contract", "account"]]);
    Route::get("/search/{regId?}",["uses" =>  "TenantController@apiSearch","roles" => ["contract", "account"]]);
    Route::post("/store",["uses" =>  "TenantController@apiStore","roles" => ["contract", "account"]]);

});
