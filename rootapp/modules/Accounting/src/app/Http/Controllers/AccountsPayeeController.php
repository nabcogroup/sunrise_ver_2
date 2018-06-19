<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/12/2018
 * Time: 9:47 AM
 */

namespace Accounting\app\Http\Controllers;



use Accounting\App\Models\AccountsPayee;

use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Supports\Result;
use KielPack\LaraLibs\Traits\PaginationTrait;


class AccountsPayeeController extends Controller
{
    use PaginationTrait;

    public function __construct()
    {

    }



    public function index(Request $request) {

        $search = [];
        $accountsPayee = AccountsPayee::orderBy('name');
        $payees =  $this->createPagination($accountsPayee,null,$search);
        return Result::response($payees);
    }

    public function lookups(Request $request) {

        $accountsPayee = AccountsPayee::orderBy('name')->get();

        return Result::response(['data' => $accountsPayee]);

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
     * @TODO: Create new Payee
     ******************************/
    public function store(Request $request) {

        $this->requestValidate($request,true);

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




    protected function requestValidate(Request $request,$new = false) {
        if($new) {
            $this->validate($request, ['name'  =>  'required|unique:payees']);
        }
        else {
            $this->validate($request, ['name'  =>  'required']);
        }
    }
}