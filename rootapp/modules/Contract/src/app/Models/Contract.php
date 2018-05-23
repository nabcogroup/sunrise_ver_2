<?php

namespace Contract\App\Models;


use Carbon\Carbon;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Base\BaseModel;

class Contract extends BaseModel
{
    protected $table = "contracts";

    protected $appends = ["full_status", "full_contract", "period"];

    protected $fillable = ["contract_no", "contract_type", "period_start", "period_end", "extra_days", "period_end_extended", "amount", "villa_id", "tenant_id"];


    public static function generateNewContract($prevContractNo,$newId, $args = array())
    {
        preg_match('/^([^-]+?)-([0-9]+?)-([0-9]+?)$/', $prevContractNo, $splits);

        if (sizeof($splits) > 0) {

            array_splice($splits, 0, 1); //exclude the whole contract_no

            $splits[1] = Carbon::now()->year;

            $splits[2] = $newId;

        }

        //glue
        $newContractNo = implode('-', $splits);
        $args['contract_no'] = $newContractNo;

        return new Contract($args);
    }

    //*************************navigation************************
    public function bill()
    {
        return $this->hasMany("Contract\App\Models\ContractBill", "contract_id", "id");
    }

    public function termination()
    {
        return $this->hasOne('Contract\App\Models\ContractTermination', 'contract_id', 'id');
    }

    public function villa()
    {
        return $this->belongsTo("Properties\App\Models\Villa", "villa_id");
    }

    public function tenant()
    {
        return $this->belongsTo("Contract\App\Models\Tenant");
    }
    //*************************end navigation************************


    /*********************mutator and accessor******************/
    protected function getFullStatusAttribute()
    {
        return Selection::convertCode($this->status);
    }

    protected function getFullContractTypeAttribute()
    {
        return Selection::convertCode($this->contract_type);
    }

    protected function getPeriodAttribute()
    {
        $period_start = Carbon::parse($this->period_start)->format('d-M-Y');
        $period_end = Carbon::parse($this->period_end)->format('d-M-Y');

        return $period_start . ' - ' . $period_end;
    }
    /**************************/


    /***/
    public function pending()
    {
        $this->setStatus('pending');
    }

    public function terminate()
    {
        if ($this->isActive()) {
            $this->setStatus('terminated');
        }
    }

    public function createTerminate($data) {

        $attributes = [
            'description' => $data['description'],
            'ref_no' => $data['ref_no'],
            'date_termination' => Carbon::parse($data['date_termination'])
        ];

        $this->termination()->create($attributes);
    }

    public function cancel()
    {
        $this->setStatus('cancelled');
    }

    /***/
    public function isPending()
    {
        return $this->hasStatusOf('pending');
    }

    public function renew()
    {
        if ($this->isActive()) {
            $this->setStatus('completed');
        }
    }

    /********************query******************/
    public function scopeGetContracts($query, $args = array())
    {

        $query = $query->join('villas', 'contracts.villa_id', '=', 'villas.id');
        $query = $query->join('tenants', 'contracts.tenant_id', '=', 'tenants.id');
        $query = $query->where('contracts.status', $args['state']);

        return $query->select("contracts.id", "contracts.contract_no", "villas.villa_no", "tenants.full_name", "contracts.created_at AS contract_created",
            "contracts.period_start",
            "contract_bills.bill_no",
            "contracts.period_end_extended", "contracts.amount", "contracts.status AS contracts_status");
    }

    public function scopeFindByNo($query, $contractNo)
    {
        return $query->model->where('contract_no', $contractNo);
    }


}