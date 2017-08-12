<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/2/2017
 * Time: 10:56 AM
 */

namespace App\Http\Datasource;


class VacantVilla implements IDataSource
{
    public function execute()
    {
        $villas = Villa::with('contracts')->where('status','vacant');

        return $villas;

    }

}