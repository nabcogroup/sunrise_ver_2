<?php

namespace App\Http\Controllers;

use App\Repositories\AccountChartRepository;
use App\Selection;
use App\AccountChart;
use Dompdf\Exception;
use App\Services\Result;
use Illuminate\Http\Request;

class AccountChartController extends Controller
{

    private $repo;

    public function __construct(AccountChartRepository $repo)
    {
        $this->repo =  $repo;
    }

    //Templates

    public function index()
    {
        return view("accountchart.list");

    }


    public function register($id = 0)
    {
        return view("accountchart.register",compact("id"));
    }


    //API
    public function create()
    {

        $lookups = Selection::getSelections(["account_type"]);
        
        return response()->json(["lookups" => $lookups]);
    }

    public function store(Request $request)
    {

        
        $this->validateEntry($request);

        try {
            if ($request->input("id", 0) == 0) {
                $accountChart = AccountChart::create($request->all());
            } else {
                $accountChart = AccountChart::find($request->input("id"));
                $accountChart->toMap($request->all());
                $accountChart->save();
            }
            
            return Result::ok("Account successfully save", $accountChart);
        } catch (Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function edit($id)
    {

        try {
            $accounts = AccountChart::find($id);
            if ($accounts) {
                $lookups = Selection::getSelections(["account_type"]);
            }

            return response()->json(["data" => $accounts,"lookups" => $lookups]);
        }
        catch(Exception $e) {
            return Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function update(Request $request)
    {

        try {
            $this->validateEntry($request, false);

            $accountChart = AccountChart::find($request->input("id"));
            $accountChart->toMap($request->all());
            $accountChart->save();

            return Result::ok("Account successfully save", $accountChart);
        } catch (Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }
    }

    public function all()
    {

        $accounts = $this->repo->getAccountCharts();
        
        return $accounts;
    }

    protected function validateEntry(Request $request, $isNew = true)
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
