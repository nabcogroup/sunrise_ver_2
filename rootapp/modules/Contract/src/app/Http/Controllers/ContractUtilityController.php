<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 12/30/2017
 * Time: 1:19 PM
 */

namespace Contract\App\Http\Controllers;

use Contract\App\Models\Contract;
use KielPack\LaraLibs\Base\Controller as BaseController;
use KielPack\LaraLibs\Supports\Facades\Result;

class ContractUtilityController extends BaseController
{
    //tools
    public function apiUpdateExtended()
    {

        $contracts = Contract::all();
        foreach ($contracts as $contract) {
            $contract->period_end_extended = Carbon::parse($contract->period_end)->addDays($contract->extra_days);
            $contract->save();
        }
        return Result::ok("Successful");
    }

}