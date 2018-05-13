<?php

namespace Accounting\app\Http\Controllers;


use Accounting\App\Models\AccountsPayee;

use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Supports\Result;

class PayeeController extends Controller
{
    public function __construct()
    {

    }



    public function index(Request $request) {
        $payees = AccountsPayee::orderBy('name')->paginate(20);
        return Result::response($payees);
    }

    /*******************************
     * HTTP-GET
     *
     * @TODO: Find payee for editing
     ******************************/
    public function create() {

        return Result::response([
            'data'      =>  AccountsPayee::createInstance(),
            'lookups'   =>  Selection::getSelections(['payee_type'])
        ]);
    }

    /*******************************
     * HTTP-GET
     *
     * @TODO: Find payee for editing
     ******************************/
    public function edit(Request $request,$id) {

        $payee = AccountsPayee::find($id);

        return Result::response([
            'data'      => $payee,
            'lookups'   => Selection::getSelections(['payee_type'])
        ]);
    }

    /*******************************
     * HTTP-PATCH
     *
     * @TODO: Update payee
     ******************************/
    public function update(Request $request) {

        $this->requestValidate($request);

        try {

            $payee = AccountsPayee::find($request->input('id',0));
            $payee->toMap($request->all());
            $payee->save();
        }
        catch (\Exception $e) {
            return Result::badRequest(['errors' => $e->getMessage()]);
        }
    }

    /*******************************
     * HTTP-POST
     *
     * @TODO: Create new Payee
    ******************************/
    public function store(Request $request) {

        $this->requestValidate($request);
        try {

            $data = $request->all();
            if(!is_null($request->input('id',null))) {
                throw new \Exception('Cannot insert existing data');
            }

            //save payee
            AccountsPayee::create($data);
            return Result::ok('Save Succefully');

        }
        catch(\Exception $e) {

            return Result::badRequest(['errors' => $e->getMessage()]);

        }
    }


    protected function requestValidate(Request $request) {

        $this->validate($request,[
            'name'  =>  'required'
        ]);
    }
}