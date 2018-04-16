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
use Carbon\Carbon;
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

            $status = $this->params->field("status", "");
            $location = $this->params->field("location", "");


            $villas = Villa::with(["contracts"])->where('location', $location)->orderBy('villa_no');

            if (!empty($status) && !is_null($status)) {
                $villas = $villas->where('status', $status);
            }

            $villas = $villas->get()->map(function ($item) {

                if ($item->contracts->count() > 0) {

                    $contract = $item->contracts->sortBy("period_start")->reverse()->first();

                    $latest_tenant = $contract->tenant()->first()->full_name;

                    if ($contract->isTerminated()) {
                        $latest_occupied = Carbon::parse($contract->contractTerminations()->first()->date_termination)->format('d M Y');
                    } else if ($contract->isCompleted()) {
                        $latest_occupied = Carbon::parse($contract->period_end)->format('d M Y');
                    } else {
                        $latest_occupied = "";
                    }
                } else {

                    $latest_tenant = "";
                    $latest_occupied = "";

                }

                $newItem = [
                    'villa_no' => $item->villa_no,
                    'electricity_no' => $item->electricity_no,
                    'water_no' => $item->water_no,
                    'qtel_no' => $item->qtel_no,
                    'villa_class' => $item->full_villa_class,
                    'latest_tenant' => $latest_tenant,
                    'latest_occupied' => $latest_occupied,
                    'status' => Selection::getValue('villa_status', $item->status),
                    'contract' => $contract,
                    'location' => $item->location,
                    'full_location' => Selection::getValue('villa_location', $item->location),
                    'contracts' => $item->contracts->sortBy("period_start"),
                    'rate_per_month' => $item->rate_per_month
                ];

                return $newItem;

            });


            $data = $this->arrayGroupBy($villas, null, ["location"]);

            return new ReportMapper("Property Villa " . ucfirst($status) . " - " . Selection::getValue("villa_location", $location), [], $data);

        } catch (Exception $e) {

        }

    }
}