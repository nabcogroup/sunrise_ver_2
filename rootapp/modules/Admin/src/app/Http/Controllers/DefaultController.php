<?php


namespace Admin\App\Http\Controllers;


class DefaultController
{
    public function index() {
        return view("admin::default.index");
    }
}