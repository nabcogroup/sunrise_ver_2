<?php


namespace Admin\App\Http\Controllers;


use App\Contract;
use App\Services\Bundle;
use App\Services\EventListenerRegister;
use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller as LaraLibController;
use App\Events\NotifyUpdate;


class ContractController extends LaraLibController
{

    public function terminate(Request $request)
    {


        $parameter = (object)["contract_no" => $request->get('contract_no')];

        $data = [
            "has_data" => false,
            "data" => [],
            "parameter" => $parameter,
            "editable" => true,
            "error" => ""
        ];


        if ($parameter->contract_no) {

            $data['data'] = Contract::with(['bill', 'tenant', 'villa','contractTerminations'])->where("status", "!=","active")->where('contract_no', $parameter->contract_no)->first();

            $data['has_data'] = $data['data'] ? true : false;

            if ($data['has_data']) {

                $data['editable'] = $data['data']->villa()->first()->status == "vacant" ? true : false;

            }
        }

        return view("admin::contract.fix_terminate", compact("data"));
    }



    public function reverse(Request $request)
    {

        $contract = Contract::findOrFail($request->get("contract_id"));

        $contract->active();

        $contract->contractTerminations()->delete();

        $bill = $contract->bill()->first();

        $contract->save();

        if ($contract->hasStatusOf("active")) {

            //update villa event
            $bundle = new Bundle();

            $bundleValue = ["id" => $contract->villa()->first()->id, "status" => "occupied"];

            $bundle->add("villa", $bundleValue);

            $bundle->add('user', $user);

            event(new NotifyUpdate($bundle, new EventListenerRegister(["UpdateVillaStatus"])));

        }

        return redirect("/admin/contract/terminate");

    }


}