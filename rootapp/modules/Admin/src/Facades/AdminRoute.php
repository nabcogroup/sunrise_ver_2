<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/2/2018
 * Time: 10:36 AM
 */

namespace Admin\Facades;


use Illuminate\Support\Facades\Facade;

class AdminRoute extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'adminRoute';
    }
}