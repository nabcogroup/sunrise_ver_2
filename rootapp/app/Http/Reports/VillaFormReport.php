<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/14/2017
 * Time: 10:51 AM
 */

namespace App\Http\Reports;


use App\Http\Datasource\Villas\VillaForm;
use App\Http\Datasource\Villas\VillaHistory;
use App\Villa;

class VillaFormReport extends BaseReport
{

    private $template;
    public function __construct($params,$namespace = 'form')
    {
        if($namespace == 'ledger') {
            $this->template = "villa-history";
            $this->dataSource = new VillaHistory($params);
        }
        else {
            $this->template = "villa-form";
            $this->dataSource = new VillaForm($params);
        }
        
    }

    public function getTemplateSource()
    {
        return $this->template;
    }

    public function isPdfRender()
    {
        return false;
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

    public function isApi() {
        return false;
    }
}