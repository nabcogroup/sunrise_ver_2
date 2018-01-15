<?php

namespace App\Http\Controllers;

use App\Selection;
use App\Services\EDB;
use Illuminate\Http\Request;


class ManagementController extends Controller
{

    public function __construct()
    {

    }

    public function index() {

        return view("management.dashboard");

    }

    public function apiGetData(Request $request) {

        $year = 2017;

        //create query
        $model = EDB::createQuery("villas")

            ->joins(["contracts" => "contracts.villa_id=villas.id"])

            ->joins(["contract_bills" => "contract_bills.contract_id=contracts.id"])

            ->joins(["payments" => "payments.bill_id=contract_bills.id"])

            ->withSoftDelete("contracts")

            ->self();

        $model = $model->where(\DB::raw("YEAR(payments.effectivity_date)"),$year)

            ->whereIn("payments.status",["clear","received","pending_case"])

            ->select(\DB::raw("SUM(payments.amount) AS rental_income"),"villas.location")

            ->groupBy("villas.location");




        return $model->get()->map(function($collection) {

            $collection->full_location = Selection::getValue("villa_location",$collection->location);

            return $collection;
        });

    }
}
