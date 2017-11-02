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
    use PaginationTrait;

    private $repo;
    private $selection;
    private $villa;

    public function __construct(
        ExpenditureRepository $repo,
        VillaRepository $villaRepository)
    {
        $this->repo = $repo;
        $this->selection = new Selection();
        $this->villa = $villaRepository;
    }

    public function index() {
        return view('expenditures.index');
    }

    public function register() {
        return view('expenditures.register');
    }

    public function edit($id) {
        return view('expenditures.register',compact('id'));
    }

    public function apiGetAll($property = null) {
        $result = $this->repo->getExpenses($property);
        
        return response()->json($result);
    }

    public function apiCreate() {

        $expenditure = $this->repo->createInstance();

        $lookups = $this->selection->getSelections(array('account_type','payment_term','bank','villa_location','bank_provider'));
        $lookups['accounts'] = AccountChart::all();
        $lookups['villas'] = $this->villa->orderBy('villa_no','asc')->get();
        $lookups['payees'] = Payee::all();

        return collect([
            'data'      =>  $expenditure,
            'lookups'   =>  $lookups
        ]);
    }

    public function apiStore(ExpenditureForm $request) {

        $inputs = $request->filterInput();
        try {
            $expenditure = $this->repo->attach($inputs,[],true)->instance();
            Result::ok("Successfully Save",['result' => $expenditure]);
        }
        catch(Exception $e) {
            Result::badRequest(['message' => $e->getMessage()]);
        }
    }

    public function apiEdit($id) {
        try {

            $expense = $this->repo->find($id);

            $lookups = $this->selection->getSelections(array('expense_type','payment_term','bank','villa_location','bank_provider'));
            $lookups['accounts'] = AccountChart::all();
            $lookups['villas'] = $this->villa->orderBy('villa_no','asc')->get();
            $lookups['payees'] = Payee::all();

            return collect([
                'data'      =>  $expense,
                'lookups'   =>  $lookups
            ]);
        }
        catch(Exception $e) {
            Result::badRequest(['message' => $e->getMessage()]);
        }

    }

    


}
