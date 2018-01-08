<?php


namespace Admin;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class AdminProvider extends ServiceProvider {

    public function boot() {

        $this->loadViewsFrom(__DIR__.'/../resources/views','admin');

    }

    public function register() {

        $loader = AliasLoader::getInstance();

        $loader->alias("AdminRoute",AdminRoute::class);

        $this->app->singleton('adminRoute',function() {
            return new AdminRoute();
        });

    }


}