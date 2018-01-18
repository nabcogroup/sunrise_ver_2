<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/7/2017
 * Time: 6:02 PM
 */

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Selection;
use App\Services\ReportService\ReportMapper;

use App\Traits\ArrayGroupTrait;
use App\Villa;
use Dompdf\Exception;
use Illuminate\Support\Facades\App;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class VillaMasterMainDatasource implements IDataSource
{

    use ArrayGroupTrait;


    protected $params;
    public function __construct($params)
    {

        $this->params = $params;

    }

    public function execute()
    {
        try {
            $status = $this->params->field("status", "vacant");

            $location = $this->params->field("location", "");


            if (!empty($location)) {
                $villas = Villa::where('status', $status)->where("location", $location)->get();
            }
            else {
                $villas = Villa::where('status', $status)->get();
            }


            $rows = [];

            foreach ($villas as $villa) {
                $row = [
                    'villa_no' => $villa->villa_no,
                    'electricity_no' => $villa->electricity_no,
                    'water_no' => $villa->water_no,
                    'qtel_no' => $villa->qtel_no,
                    'villa_class' => $villa->full_villa_class,
                    'location' => $villa->location,
                    'full_location' => Selection::getValue("villa_location", $villa->location),
                    'rate_per_month' => $villa->rate_per_month
                ];

                if ($villa->isOccupied()) {
                    $engageContracts = $villa->engageContracts()->first();
                    if ($engageContracts) {
                        $row['tenant'] = $engageContracts->tenant()->first();
                    }

                }


                array_push($rows, $row);

            }

            $data = $this->arrayGroupBy($rows, null, ["location"]);


            return new ReportMapper("Property Villa Vacant Report", [], $data);
        }
        catch(Exception $e) {
            dd($engageContracts);
        }

    }
}