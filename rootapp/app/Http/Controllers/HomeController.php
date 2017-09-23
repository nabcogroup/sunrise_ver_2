<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function apiInfo() {

        $info = [
            'ver'           => config('app.version'),
            'dev'     => "Nabco Web Developer Team...",
            'repo'    =>  "https://github.com/lyndonkieljerymiah/sunrise-ver2.1.git",
            'env'           =>  config("app.env"),
            'devteam'       => config("app.devteam")
        ];

        return $info;
    }
}
