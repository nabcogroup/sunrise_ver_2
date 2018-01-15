<?php

namespace Admin\App\Http\Controllers;

use App\Villa;
use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller as LaralibController;

class VillaController extends LaralibController
{

    public function commencement(Request $request)
    {

        $location = $request->get("location");

        $villas = Villa::where("location", $location)->get();

        $transactions = [];

        foreach ($villas as $villa) {

            $contracts = $villa->contracts()->select("contract_no", "period_start", "period_end", "status", "amount")->orderBy("period_start")->first();

            if($contracts) {
                $villa->rent_commencement = $contracts->period_start;

                $villa->save();
            }
        }


        return $transactions;

    }
}