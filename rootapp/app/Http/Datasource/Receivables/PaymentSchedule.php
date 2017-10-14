<?php


namespace App\Http\Datasource\Receivables;


use App\Http\Datasource\IDataSource;
use App\Selection;
use App\Services\ReportService\ReportMapper;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;
use Carbon\Carbon;

class PaymentSchedule implements IDataSource
{
    use QuerySoftDeleteTrait;

    use ArrayGroupTrait;

    private $params;


    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        $month_from = $this->params->field("month_from",Carbon::now()->month);
        $month_to = $this->params->field("month_to",Carbon::now()->addMonth()->month);
        $location = $this->params->field("location");
        $year = $this->params->field("year",Carbon::now()->year);



        $records = $this->createDb('contracts')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->join('villas', 'villas.id', '=', 'contracts.villa_id')
            ->groupBy(
                \DB::raw("MONTH(payments.period_start)"),
                "villas.villa_no",
                "contracts.contract_no")
            ->where('contracts.status', 'active')
            ->where('villas.location', $location)
            ->where('payments.status', 'received')
            ->whereYear('payments.period_start', $year)
            ->whereBetween(\DB::raw('MONTH(payments.period_start)'), [$month_from, $month_to])
            ->select(
                \DB::raw("villas.villa_no,contracts.contract_no,
                SUM(payments.amount) AS total_payments,
                MONTH(payments.period_start) number_month"),
                \DB::raw("(SELECT SUM(amount) FROM payments where status ='received' AND bill_id = contract_bills.id) AS total_due"))
            ->orderBy('villas.villa_no')
            ->get();

        $column_month = [];
        $rows = $this->arrayGroupBy($records, null,["villa_no","number_month"]);

        $this->params->update("location",Selection::getValue('villa_location', $location));

        return new ReportMapper("Payment Schedule",$this->params->toArray(),$rows);



    }


}