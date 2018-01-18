<?php

namespace Reports;


use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class ReportProvider extends ServiceProvider
{

    public function boot() {



        $this->publishes([dirname(__DIR__), "/config" => base_path("config")]);

        $this->loadViewsFrom(__DIR__ . "/../resources/views","reports");


    }

    public function register() {

        $loader = AliasLoader::getInstance();

        $loader->alias("ReportRoute",\Reports\Facades\ReportRoute::class);

    }
}