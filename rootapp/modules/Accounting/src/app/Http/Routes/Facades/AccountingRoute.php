<?php

namespace Accounting\App\Http\Routes\Facades;


use Illuminate\Support\Facades\Facade;

class AccountingRoute extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'accountingRoute';
    }
}