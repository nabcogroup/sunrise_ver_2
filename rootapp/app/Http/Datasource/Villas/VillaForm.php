<?php

namespace App\Http\Datasource\Villas;


use App\Http\Datasource\IDataSource;
use App\Villa;


class VillaForm implements IDataSource
{
    private $params;
    public function __construct($params)
    {
        $this->params = $params;
    }

    public function execute()
    {
        $villas = Villa::with('engageContracts')->where('villa_no', $this->params['villa_no'])->get();
        $rows = [];
        foreach($villas as $villa) {
            $row = [
                'villa_no'          =>  $villa->villa_no,
                'location'          =>  $villa->full_location,
                'electricity_no'    =>  $villa->electricity_no,
                'water_no'          =>  $villa->water_no,
                'qtel_no'           =>  $villa->qtel_no,
                'villa_class'       =>  $villa->full_villa_class,
                'rate_per_month'    =>  $villa->rate_per_month,
                'villa_status'      =>  ucfirst($villa->status),
                'description'       =>  $villa->description,
                'tenant_name'           =>  '',
                'contact_no'            =>  '',
                'email_address'         =>  '',
                'tel_no'                =>  '',
                'mobile_no'             =>  '',
                'period'                =>  '',
                'contract_amount'       =>  '0',
                'contract_status'       =>  ''
            ];

            if($villa->engageContracts()->get()->count() > 0) {
                $row['tenant_name'] =  $villa->engageContracts()->first()->tenant()->first()->full_name;
                $row['tel_no']  =  $villa->engageContracts()->first()->tenant()->first()->tel_no;
                $row['mobile_no'] = $villa->engageContracts()->first()->tenant()->first()->mobile_no;
                $row['email_address'] = $villa->engageContracts()->first()->tenant()->first()->email_address;
                $row['contract_no'] = $villa->engageContracts()->first()->contract_no;
                $row['period'] = \Carbon\Carbon::parse($villa->engageContracts()->first()->period_start)->format('d M y')."-".\Carbon\Carbon::parse($villa->engageContracts()->first()->period_end)->format('d M y');
                $row['contract_amount'] = $villa->engageContracts()->first()->amount;
                $row['contract_status'] = $villa->engageContracts()->first()->status;
                $row['tenant_reg_id'] = $villa->engageContracts()->first()->tenant()->first()->reg_id;
            }
           array_push($rows,$row);
        }

        return $rows;
    }
}