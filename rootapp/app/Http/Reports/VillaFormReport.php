<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:51 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\VillaForm;
use App\Villa;

class VillaFormReport extends BaseReport
{

    public function __construct($params)
    {
        $this->dataSource = new VillaForm($params);
    }

    public function getTemplateSource()
    {
        return 'villa-form';
    }

    public function isPdfRender()
    {
        return true;
    }

    public function getLookups()
    {
        //villa
        $lookups = [
            'villas' => []
        ];
        $villas = Villa::select('id', 'villa_no')->orderBy('villa_no')->get();
        foreach($villas as $villa) {
            $vdata = ['code' => $villa->villa_no, 'name' => $villa->villa_no];
            array_push($lookups['villas'],$vdata);
        }

        return $lookups;
    }
}