<?php

namespace Admin;




use Illuminate\Support\Facades\Route;

class AdminRoute
{
    public static function routes() {

        require __DIR__.'/../routes/web.php';
    }
}