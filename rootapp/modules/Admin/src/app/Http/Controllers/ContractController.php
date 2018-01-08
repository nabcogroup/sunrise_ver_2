<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 1/8/2018
 * Time: 11:26 AM
 */

namespace Admin\app\Http\Controllers;


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
            $data['data'] = Contract::with(['bill', 'tenant', 'villa'])->where("status", "terminated")->where('contract_no', $parameter->contract_no)->first();
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

        $payments = $bill->payments()->where("status","cancelled")->get();
        if($payments->count() > 0) {
            foreach ($payments as $payment) {
                $payment->setStatusToReceived();
                $payment->save();
            }
        }

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