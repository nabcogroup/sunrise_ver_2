<?php

namespace Accounting\app\Http\Controllers;

use http\Env\Request;
use KielPack\LaraLibs\Supports\Predictive;

class PredictiveController
{
    protected $predictive;


    public function __construct(Predictive $predictive)
    {
        $this->predictive = $predictive;
    }

    //[HTTP-POST]
    public function store(Request $request) {

    }
}