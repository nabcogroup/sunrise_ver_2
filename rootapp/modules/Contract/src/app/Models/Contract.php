<?php

namespace Contract\App\Models;


use Carbon\Carbon;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Base\BaseModel;

class Contract extends BaseModel
{
    protected $table = "contracts";

    protected $appends = ["full_status","full_contract","period"];

    protected $fillable = [""];



    public function bill() {
        return $this->hasMany("Contract\App\Models\ContractBill","contract_id","id");
    }

    public function termination() {
        return $this->hasOne('Contract\App\Models\ContractTermination','contract_id','id');
    }

    public function villa() {
        return $this->belongsTo("Properties\App\Models\Villa","villa_id");
    }

    public function tenant() {
        return $this->belongsTo("Contract\App\Models\Tenant");
    }

    /*mutator and accessor*/
    protected function getFullStatusAttribute() {
        return Selection::convertCode($this->status);
    }

    protected function getFullContractTypeAttribute() {
        return Selection::convertCode($this->contract_type);
    }

    protected function getPeriodAttribute() {
        
        $period_start = Carbon::parse($this->period_start)->format('d-M-Y');
        
        $period_end = Carbon::parse($this->period_end)->format('d-M-Y');

        return $period_start . ' - ' . $period_end;
    }
    /**************************/

    /***/
    public function pending() {
        $this->setStatus('pending');
    }
    public function terminate() {
        $this->setStatus('terminated');
    }
    public function cancel() {
        $this->setStatus('cancelled');
    }

    /***/
    public function isPending() {
        return $this->hasStatusOf('pending');
    }





}