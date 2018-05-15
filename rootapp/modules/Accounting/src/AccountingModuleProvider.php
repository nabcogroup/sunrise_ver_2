<?php


namespace Accounting;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class AccountingModuleProvider extends ServiceProvider {

    public function boot()
    {
        $this->publishes([
            __DIR__ . "/database/migrations" => base_path("database/migrations")
        ]);
    }

    public function register() {
        $this->app->bind('accountingRoute','\Accounting\App\Http\Routes\AccountingRoute');
        $loader = AliasLoader::getInstance();
        $loader->alias('AccountsRoutes',"\Accounting\App\Http\Routes\Facades\AccountingRoute");
    }

    public function registerPublishableResources() {
        
    }

}