<?php

$namespace = "\Admin\App\Http\Controllers";

Route::get("/",$namespace."\DefaultController@index")->name("admin.default");


Route::group(["prefix" => "payment"],function() use($namespace) {

    Route::get('/reverse', $namespace.'\PaymentController@reverse')->name("admin.payment.reverse");
    Route::post('/reverse',$namespace.'\PaymentController@reverse')->name("admin.payment.reverse");
    Route::post('/update',$namespace.'\PaymentController@update')->name("admin.payment.update");

});

Route::group(["prefix" => "villa"],function() use($namespace) {
    Route::get("/commencement", $namespace."\VillaController@commencement");
    Route::get("/resolved",$namespace."\VillaController@resolve");
    Route::post("/update",$namespace."\VillaController@update")->name("admin.villa.update");

});


Route::group(["prefix" => "contract"],function() use($namespace) {

    Route::get("/terminate", $namespace."\ContractController@terminate")->name("admin.contract.terminate");

    Route::post("/terminate", $namespace."\ContractController@terminate")->name("admin.contract.terminate");

    Route::post("/reverse", $namespace."\ContractController@reverse")->name("admin.contract.reverse");

});