<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/7/2017
 * Time: 5:12 PM
 */

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use Carbon\Carbon;

use App\Traits\ArrayGroupTrait;
use App\Traits\QuerySoftDeleteTrait;

class VillaSales implements IDataSource
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

        $recordset = $this->createDb('villas')
            ->join('contracts', 'contracts.villa_id', '=', 'villas.id')
            ->join('contract_bills', 'contract_bills.contract_id', '=', 'contracts.id')
            ->join('payments', 'payments.bill_id', '=', 'contract_bills.id')
            ->groupBy(\DB::raw("MONTH(payments.effectivity_date),villas.villa_no"))
            ->select(
                \DB::raw("villas.villa_no,
                        villas.rate_per_month,
                        villas.status,
                        SUM(payments.amount) total_payments,
                        MONTH(payments.period_start) total_month")
            )
            ->where('villas.location', $location)
            ->where('payments.status', '=', 'clear')
            ->where(\DB::raw('YEAR(payments.period_start)'),$year)
            ->whereBetween(\DB::raw('MONTH(payments.period_start)'), [$month_from, $month_to])
            ->orderBy('villas.villa_no','villas.rate_per_month',\DB::raw("MONTH(payments.period_start)"))
            ->get();
        
        $rows = [
            'data' => [],
            'total' => 0,
            'months' => [],
            'period' => [
                    'from'  =>  date('F', mktime(0, 0, 0, $month_from, 10)),
                    'to'    =>  date('F', mktime(0, 0, 0, $month_to, 10)),
                    'year'  =>  $year
            ],
        ];

        $column_month = [];
        $rows = $this->arrayGroup($recordset,function($row) use(&$column_month) {
            $item = [
                'villa_no' => $row->villa_no,
                'rate_per_month' => $row->rate_per_month,
                'number_month' => $row->total_month,
                'total_payments' => $row->total_payments,
                'villa_status' => $row->status
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
        $rows['months'] = $column_month;
        $rows['location'] = \App\Selection::getValue("villa_location",$location);
        $rows['period'] = [
            'from'  =>  date('F', mktime(0, 0, 0, $month_from, 10)),
            'to'    =>  date('F', mktime(0, 0, 0, $month_to, 10)),
            'year'  =>  $year
        ];

        // TODO: Implement execute() method.

        return $rows;
    }
}