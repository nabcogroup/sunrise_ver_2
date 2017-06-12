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

Route::group(['prefix' => "register"],function() {
   Route::post("/remove", "Auth\RegisterController@remove");
});

Route::get('/', "DashboardController@index")->middleware('auth')->name("dashboard");

//villa web
Route::group(['prefix' => 'villa', 'middleware' => ['auth','roles'],'roles' => ['admin','contract','account']],function() {

    Route::get('/',"VillaController@index")->name('villa.manage');
    Route::get('/register/{id?}',"VillaController@register")->name('villa.register');
    Route::get('/image/{fileName}',"VillaController@imageSource");

});

//api villa
Route::group(['prefix' => 'api/villa', 'middleware' => ['auth','roles'],'roles' => ['admin','contract','account']],function() {

    Route::get('/list',"VillaController@apiList");
    Route::get('/search',"VillaController@apiList");
    Route::get('/create/{id?}', "VillaController@apiCreate");

    Route::post('/store', "VillaController@apiStore");
    

});

//contract web
Route::group(['prefix' => 'contract', 'middleware' => ['auth','roles'],'roles' => ['contract','admin','account']],function() {

    Route::get('/',"ContractController@index")->name('contract.manage');
    Route::get('/register',"ContractController@register")->name('contract.create');
    Route::get('/show/{id}',"ContractController@show")->name('contract.show');
    Route::get('/calendar',"ContractController@calendar")->name('contract.calendar');

});

//contract api
Route::group(['prefix' => 'api/contract','middleware' => ['auth','roles'],'roles' => ['contract','admin','account']],function() {

    Route::get('/list/{status?}',"ContractController@apiGetList");
    Route::get('/create', "ContractController@apiCreate");
    Route::get('/renew/{id}', "ContractController@apiRenew");
    Route::get('/calendar',"ContractController@apiCalendar");

    Route::post('/recalc',"ContractController@apiRecalc");
    Route::post('/store',"ContractController@apiStore");
    Route::post('/cancel', "ContractController@apiCancel");
    Route::post('/renew',"ContractController@apiUpdate");
    Route::post('/terminate',"ContractController@apiTerminate");

});

//bill
Route::group(['prefix' => 'bill', 'middleware' => ['auth','roles']],function() {

    Route::get('/create/{contractNo}',["uses" => "ContractBillController@create", "roles" => ["contract","admin","account"]])->name('bill.create');
    Route::get('/show/{billNo}',["uses" => "ContractBillController@show", "roles" => ["contract","account","admin"]])->name('bill.show');
    Route::get('/edit',["uses" => "ContractBillController@edit", "roles" => ["account","admin"]])->name('bill.edit');
});

//bill api
Route::group(['prefix' => 'api/bill', 'middleware' => ['auth','roles']],function() {

    Route::get('/create/{contractNo}',["uses" => "ContractBillController@apiCreate", "roles" => ["contract","account", "admin"]]);
    Route::post('/store',["uses" => "ContractBillController@apiStore", "roles" => ["contract","account", "admin"]]);

    Route::get('/edit/{billNo?}',["uses" => "ContractBillController@apiEdit","roles" => ["account","admin"]]);
    Route::post('/update',["uses" => "ContractBillController@apiUpdate", "roles" => ["account","admin"]]);
    Route::get('/search/{filter?}/{value?}',["uses" => "ContractBillController@apiSearch", "roles" => ["account","admin"]]);

});
