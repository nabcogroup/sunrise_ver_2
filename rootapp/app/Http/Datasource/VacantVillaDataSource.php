<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/2/2017
 * Time: 10:56 AM
 */

namespace App\Http\Datasource;


use App\Villa;

class VacantVillaDataSource implements IDataSource
{
    public function execute()
    {
        $villas = Villa::with('contracts')->where('status','vacant')->get();

        return $villas;

    }

}