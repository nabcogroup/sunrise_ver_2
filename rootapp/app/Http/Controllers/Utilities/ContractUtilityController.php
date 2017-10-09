<?php

namespace App\Http\Controllers\Utilities;

use App\Contract;
use App\Services\Result;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ContractRepository;

class ContractUtilityController extends Controller
{

    private $repository;

    public function __construct(ContractRepository $repository) {
        $this->repository = $repository;
    }

    public function execute($action,Request $request) {
        return call_user_func(array($this,$action),$request);
    }


    public function fix_termination(Request $request) {

        $contracts = Contract::where("status","terminated")->get();

        if($contracts->count() > 0) {
            foreach($contracts as $contract) {
                $contract->fixTerminate();
            }
        }

        return Result::ok("Terminated fixed!!!");

    }

    public function update_extended(Request $request) {

        $contracts = \App\Contract::all();
        foreach ($contracts as $contract) {
            $contract->period_end_extended = Carbon::parse($contract->period_end)->addDays($contract->extra_days);
            $contract->save();
        }
        return Result::ok("Successful");
    }
}
