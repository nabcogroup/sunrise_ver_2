<?php

namespace Accounting;


use Illuminate\Support\Facades\Route;

class AccountingRoute
{
    public static function routes()
    {
        require __DIR__.'/../routes/routes.php';
    }


}