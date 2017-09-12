<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 9/11/2017
 * Time: 2:27 PM
 */

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;

class VillaPaymentSchedule implements IDataSource
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
        $month_from = isset($this->params['month_from']) ? (int)$this->params['month_from'] : '';
        $month_to = isset($this->params['month_to']) ? (int)$this->params['month_to'] : '';
        $location = isset($this->params['location']) ? $this->params['location'] : 'sv1';
        $year = isset($this->params['year']) ? (int)$this->params['year'] : \Carbon\Carbon::now()->year;

        $records = $this->createDb('contracts')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->join('villas', 'villas.id', '=', 'contracts.villa_id')
            ->groupBy(\DB::raw("MONTH(payments.effectivity_date),villas.villa_no,contracts.contract_no"))
            ->where('contracts.status', 'active')
            ->where('villas.location', $location)
            ->where('payments.status', 'received')
            ->whereYear('payments.period_start', $year)
            ->whereBetween(\DB::raw('MONTH(payments.period_start)'), [$month_from, $month_to])
            ->select(
                \DB::raw("villas.villa_no,contracts.contract_no,SUM(payments.amount) AS total_payments,MONTH(payments.effectivity_date) total_month"))
            ->toSql();
        dd($records);
        $this->arrayGroup($records, function ($row) {
            $row = [
                'villa_no'      =>  $record->villa_no,
                'contract_no'   =>  $record->contract_no,
                'number_month' => $record->total_month,
                'total_payments' => $record->total_payments
            ];
        });


    }


}