<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UtilityController extends Controller
{

    public function index() {

    }
    public function reversePayment(Request $request) {

        $param = (object)["bill_no" => $request->get('bill_no'), "status" => $request->get('status')];
        
    }
}
