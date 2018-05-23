<?php

namespace App\Http\Controllers;

use App\AccountChart;
use App\Expenditure;
use App\Http\Requests\ExpenditureForm;
use App\Payee;
use App\Repositories\ExpenditureRepository;
use App\Repositories\VillaRepository;
use App\Selection;
use App\Services\Result;
use App\Traits\PaginationTrait;
use Dompdf\Exception;
use Illuminate\Http\Request;

class ExpenditureController extends Controller
{
    public function index() {
        return view('expenditures.index');
    }

    public function register() {
        return view('expenditures.register');
    }

    public function edit($id) {
        return view('expenditures.register',compact('id'));
    }

}
