<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/8/2018
 * Time: 5:23 PM
 */

namespace Admin\app\Http\Controllers;


class DefaultController
{
    public function index() {
        return view("admin::default.index");
    }
}