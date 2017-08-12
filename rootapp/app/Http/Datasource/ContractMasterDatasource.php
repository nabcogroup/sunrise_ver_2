<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/2/2017
 * Time: 2:34 PM
 */

namespace App\Http\Datasource;


use App\Contract;

class ContractVillaDataSource implements IDataSource
{

    public function execute()
    {

        //get all villa with contract
        $contracts = Contract::with(['villa','tenant'])->whereIn('status',['active','pending'])->get();

        return $contracts;



    }
}