<?php 


namespace App\Http\Datasource\Villas;

use App\Http\Datasource\IDataSource;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;


class VillaPaymentCollection implements IDataSource {
    
    use QuerySoftDeleteTrait,ArrayGroupTrait;

    private $params;

    public function __construct($params)
    {
        $this->params = $params;

    }

    public function execute() {

        $location = $this->params["location"];
        $year = $this->params["year"];
        $month_from = $this->params["month_from"];
        $month_to = $this->params["month_to"];


        $recordset = $this->createDb("villas")
                        ->join("contracts", "contracts.villa_id", "villas.id")
                        ->join("contract_bills","contract_bills.contract_id","contracts.id")
                        ->join("payments","payments.bill_id", "contract_bills.id")
                        ->select("villas.villa_no",
                                "payments.payment_type",
                                \DB::raw("SUM(payments.amount) AS amount_deposited"),
                                \DB::raw("MONTH(payments.date_deposited) AS month_deposited"),
                                \DB::raw("(SELECT SUM(amount) FROM payments where status ='clear' AND bill_id = contract_bills.id) AS total_payable"))
                        ->groupBy("villas.villa_no",
                                "payment_type",
                                \DB::raw("MONTH(payments.date_deposited)"))
                        ->whereNull("contracts.deleted_at")
                        ->where("villas.location",$location)
                        ->where(\DB::raw("YEAR(payments.date_deposited)"),$year)
                        ->whereBetween(\DB::raw("MONTH(payments.date_deposited)"),[$month_from,$month_to])
                        ->orderBy("villas.villa_no")
                        ->get();

        $groupSummary = $this->arrayGroupBy($recordset,function($row) {

            $item = [
                "villa_no" => $row->villa_no,

            ];

            return $item;

        },["villa_no","payment_type","month_deposited"]);
        for($i = $month_from; $i <= $month_to; $i++) {
            $headers[] = date('M', mktime(0, 0, 0, $i, 10));
        }

        $ret_value = [
            'location'      =>  \App\Selection::getValue("villa_location",$location),
            'year'          =>  $year,
            'month_from'    => $month_from,
            'month_to'      => $month_to,
            'data'          => $groupSummary
        ];


        return $ret_value;

        
        
    }

}