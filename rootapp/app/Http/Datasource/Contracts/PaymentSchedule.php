<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 9/11/2017
 * Time: 2:27 PM
 */

namespace App\Http\Datasource\Contracts;


use App\Http\Datasource\IDataSource;
use App\Selection;
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
        $month_from = isset($this->params['month_from']) ? (int)$this->params['month_from'] : Carbon::now()->month;
        $month_to = isset($this->params['month_to']) ? (int)$this->params['month_to'] : Carbon::now()->addMonth()->month;
        $location = isset($this->params['location']) ? $this->params['location'] : 'sv1';
        $year = isset($this->params['year']) ? (int)$this->params['year'] : \Carbon\Carbon::now()->year;

        $records = $this->createDb('contracts')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->join('villas', 'villas.id', '=', 'contracts.villa_id')
            ->groupBy(\DB::raw("MONTH(payments.period_start),villas.villa_no,contracts.contract_no"))
            ->where('contracts.status', 'active')
            ->where('villas.location', $location)
            ->where('payments.status', 'received')
            ->whereYear('payments.period_start', $year)
            ->whereBetween(\DB::raw('MONTH(payments.period_start)'), [$month_from, $month_to])
            ->select(
                \DB::raw("villas.villa_no,contracts.contract_no,SUM(payments.amount) AS total_payments,MONTH(payments.period_start) total_month"))
            ->orderBy('villas.villa_no')
            ->get();

        $column_month = [];
        $rows = $this->arrayGroup($records, function ($row) use (&$column_month) {
            $item = [
                'villa_no'      =>  $row->villa_no,
                'contract_no'   =>  $row->contract_no,
                'number_month' => $row->total_month,
                'total_payments' => $row->total_payments
            ];

            if(isset($column_month[$row->total_month])) {
                $p = &$column_month[$row->total_month];
                $p['total'] = floatval($p['total']) + floatval($row->total_payments);
            }
            else {
                $column_month[$row->total_month] = [
                    'date_name' => date('M', mktime(0, 0, 0, $row->total_month, 10)),
                    'total'     =>  floatval($row->total_payments)];
            }

            return $item;
        });

        ksort($column_month);
        $rows['column_month'] = $column_month;
        $rows['location'] = Selection::getValue('villa_location', $location);
        $rows['period'] = [
            'from'  =>  date('F', mktime(0, 0, 0, $month_from, 10)),
            'to'    =>  date('F', mktime(0, 0, 0, $month_to, 10)),
            'year'  =>  $year
        ];

        return $rows;



    }


}