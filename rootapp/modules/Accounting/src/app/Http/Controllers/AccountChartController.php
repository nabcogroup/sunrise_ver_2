<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/13/2018
 * Time: 9:28 AM
 */

namespace Accounting\app\Http\Controllers;


use Accounting\App\Models\AccountChart;

use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Supports\Result;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Traits\PaginationTrait;

class AccountChartController extends Controller
{

    use PaginationTrait;

    /*******************************
     * HTTP-GET
     * @TODO: display all charts
     ******************************/
    public function index() {

        $coa = AccountChart::orderBy('code');

        return $this->createPagination($coa, function($row) {

            $item = [

                'id'            =>  $row->id,

                'code'          =>  $row->code,

                'description'   =>  $row->description,

                'account_type'  =>  $row->account_type,

                'account_full_type'  =>  Selection::getValue('account_type', $row->account_type)

            ];

            return $item;

        });
    }


    /*******************************
     * HTTP-GET
     * @TODO: create new chart
     ******************************/
    public function create() {

        $accountChart = AccountChart::createInstance();

        $lookups = Selection::getSelections(["account_type"]);

        return Result::response(["lookups" => $lookups, "account" => $accountChart]);
    }


    /*******************************
     * HTTP-POST
     * @TODO: insert new chart
     ******************************/
    public function store(Request $request) {

        $this->requestValidate($request);

        AccountChart::create($request->all());

        return Result::ok("Account successfully save");

    }


    /*******************************
     * HTTP-GET
     * @TODO: edit chart
     ******************************/
    public function edit($id) {

        $coa = AccountChart::find($id);

        $lookups = Selection::getSelections(["account_type"]);

        return Result::response(["data" => $coa,"lookups" => $lookups]);

    }

    /*******************************
     * HTTP-POST
     * @TODO: update edited chart
     ******************************/
    public function update(Request $request) {

        $this->requestValidate($request, false);

        try {

            $coa = AccountChart::find($request->input("id"));

            if (is_null($coa)) {

                throw new \Exception("Unable to update invalid accounts");

            }

            $coa->toMap($request->all());

            $coa->save();

            return Result::ok("Account successfully update");

        }
        catch(\Exception $e) {
            return Result::badRequest(["errors" => $e->getMessage()]);
        }
    }

    protected function requestValidate(Request $request, $isNew = true)
    {

        //validate
        $args = [
            "code"          =>  "required",
            "account_type"  =>  "required",
            "description"   =>  "required|string"
        ];

        if ($isNew) {
            $args["code"] = "required|unique:account_charts";
        }

        $this->validate($request, $args);
    }
}