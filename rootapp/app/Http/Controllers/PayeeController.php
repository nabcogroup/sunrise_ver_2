<?php

namespace App\Http\Controllers;

use App\Http\Requests\PayeeForm;
use App\Repositories\PayeeRepository;
use App\Selection;
use App\Services\Result;
use App\Traits\PaginationTrait;
use Dompdf\Exception;
use Illuminate\Http\Request;

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
            $selection = new Selection();

            $items = [];
            foreach($payees as $payee) {
                $item = [
                    'payee_code' => $payee->payee_code,
                    'name' => $payee->name,
                    'full_address' => $payee->full_address,
                    'contact_no'    => $payee->contract_no
                ];
                array_push($items,$item);
            }

            return $this->createOutput($payees,$items);
        }
        catch(Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }


}
