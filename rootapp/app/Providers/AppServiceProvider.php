<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
         //for old ver of my sql 
        Schema::defaultStringLength(191);
        View::composer('layouts.master', "\App\Http\ViewComposers\MenuComposer");

        $this->loadHelpers();

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    public function loadHelpers() {

        $functionFiles = glob(dirname(__DIR__) . "/Helpers/*.php");
        
        foreach($functionFiles as $filename) {
            if(file_exists($filename))
                require_once $filename;
        }
    }
}
