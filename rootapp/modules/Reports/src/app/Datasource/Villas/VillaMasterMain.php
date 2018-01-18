<?php


namespace Reports\App\Datasource\Villas;


use App\Selection;
use App\Traits\ArrayGroupTrait;
use App\Villa;
use Reports\App\Datasource\IDataSource;
use Reports\App\Services\ReportMapper;

class VillaMasterMain implements IDataSource
{

    use ArrayGroupTrait;


    protected $params;

    public function __construct($params)
    {

        $this->params = $params;

    }

    public function execute()
    {

        $status = $this->params->field("status", "vacant");

        $location = $this->params->field("location", "");


        if (!empty($location)) {
            $villas = Villa::where('status', $status)->where("location", $location)->get();
        } else {
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

    public function lookups()
    {
        // TODO: Implement getLookups() method.
        $lookups = Selection::getSelections(["villa_status"]);
        return $lookups;
    }
}