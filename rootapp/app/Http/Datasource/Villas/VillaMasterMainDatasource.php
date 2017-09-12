<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/7/2017
 * Time: 6:02 PM
 */

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Villa;

class VillaMasterMainDatasource implements IDataSource
{

    public function execute()
    {
        
        $villas = Villa::with('engageContracts');

        $rows = [];
        foreach($villas as $villa) {
            
            $row = [
                'villa_no'          =>  $villa->villa_no,
                'electricity_no'    =>  $villa->electricity_no,
                'water_no'          =>  $villa->water_no,
                'qtel_no'           =>  $villa->qtel_no,
                'villa_class'       =>  $villa->full_villa_class,
                'tenant'            =>  $villa->engageContracts()->get()
            ];

            array_push($rows,$row);
            
        }

        return $rows;

    }
}