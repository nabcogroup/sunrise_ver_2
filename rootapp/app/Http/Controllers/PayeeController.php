<?php

namespace App\Http\Controllers;

use App\Selection;
use Dompdf\Exception;
use Illuminate\Http\Request;
use App\Traits\PaginationTrait;
use App\Http\Requests\PayeeForm;
use App\Repositories\PayeeRepository;

use KielPack\LaraLibs\Supports\Result;



class PayeeController extends Controller
{
    use PaginationTrait;


    private $rep;


    public function __construct(PayeeRepository $rep)
    {
        $this->rep = $rep;
    }

    public function index() {
        return view('payee.index');
    }

    public function register() {
        return view('payee.register');
    }

    public function edit($id) {
        return view('payee.register',compact('id'));
    }

    public function apiCreate() {

        $payee = $this->rep->createInstance();
        $selection = new Selection();

        return [
            'data'      =>  $payee,
            'lookups'    =>  $selection->getSelections(['payee_type'])
        ];
    }

    public function apiStore(PayeeForm $request) {

        $inputs = $request->filterInput();

        try {

            $this->rep->save($inputs);
            $payees = $this->rep->getAll();

            return $payees;

        }
        catch(Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function apiList() {
        try {

            $payees = $this->rep->paginate(20);
            
            // $selection = new Selection();
            // $items = [];
            // foreach($payees as $payee) {
            //     $item = [
            //         'payee_code' => $payee->payee_code,
            //         'name' => $payee->name,
            //         'full_address' => $payee->full_address,
            //         'contact_person'    => $payee->contract_person
            //     ];
            //     array_push($items,$item);
            // }

            return Result::response($payees);

        }
        catch(Exception $e) 
        {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }
}
