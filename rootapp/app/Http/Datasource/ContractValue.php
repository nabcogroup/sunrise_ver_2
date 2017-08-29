<?php
namespace App\Http\Datasource;

use App\Contract;


class ContractValue implements IDataSource
{
    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        //get all villa with contract
        $contracts = Contract::with(['villa','tenant'])
                    ->whereIn('status',['active','pending']);

        if(isset($this->params['contract_status'])) {
            $contracts = $contracts->where('status',$this->params['contract_status']);
        }

        if(isset($this->params['contract_year'])) {
            $contracts = $contracts->whereYear('period_start',$this->params['contract_year']);
        }

        $contracts = $contracts->orderBy('contract_no')->get();
        $total = $contracts->sum('amount');
        $rows = [];

        foreach($contracts as $key => $contract) {

            $row = [
                'villa_no'      =>  $contract->villa()->first()->villa_no,
                'contract_no'   =>  $contract->contract_no,
                'date_entry'    =>  \Carbon\Carbon::parse($contract->created_at)->format('d M y'),
                'full_name'     =>  $contract->tenant()->first()->full_name,
                'date_period'   =>  \Carbon\Carbon::parse($contract->period_start)->format('d M y')." - ".\Carbon\Carbon::parse($contract->period_end)->format('d M y'),
                'total_year'    =>  $contract->total_year_month,
                'rate_per_month'    =>  number_format($contract->villa()->first()->rate_per_month,2),
                'full_value'        =>  number_format($contract->amount,2),
                'contract_status'   =>  ucfirst($contract->status)];

            array_push($rows,$row);
        }

        usort($rows,function($a,$b) {
            $a = $a['villa_no'];
            $b = $b['villa_no'];
            if ($a == $b) return 0;
            return ($a < $b) ? -1 : 1;
        });

        return [
            'data'  =>  $rows,
            'total' =>  $total,
            'year'  =>  $this->params['contract_year']
        ];
    }
}