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

    public function resolve(Request $request) {


        $villas = Villa::with(["contracts" => function($query) {

            $query->where("status","active")->orderBY("period_start");

        }])->where("status","occupied")
            ->get()
            ->filter(function($row) {

                return $row->contracts->count() == 0 ? true : false;

            });

        return view("admin::villa.villa_status",compact("villas"));
    }

    public function update(Request $request) {

        $inputs = $request->all();

        $villa_keys = array_keys($inputs["villas"]);

        foreach ($villa_keys as $key) {

            $villa = Villa::find($key);
            $villa->setToVacant();
            $villa->save();
        }

        return redirect()->to("admin/villa/resolved");

    }
}