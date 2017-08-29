<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Payment extends BaseModel
{
    protected $appends = ['full_status','full_payment_type','full_payment_mode','selected','status_flag','full_bank'];

    //
    public function __construct(array $attributes = [])
    {
        $this->created_at = Carbon::now();
        $this->updated_at = Carbon::now();
        parent::__construct($attributes);

    }

    public static function createInstance() {
        
        $p = new Payment([
            "effectivity_date"      =>  Carbon::now()->toDateTimeString(),
            "payment_type"          =>  "cheque",
            "payment_mode"          =>  "payment",
            "payment_no"            =>  "",
            "bank"                  =>  "",
            "reference_no"          =>  "",
            "amount"                =>  "0.00",
            "remarks"               =>  "",
            "status"                =>  "received",
            "deposited_bank"        =>  "",
            "date_deposited"        =>  Carbon::now()->toDateTimeString(),
            "bank_account"          =>  ""]);

        return $p;

    }



    /**Mutator*/
    protected function getFullStatusAttribute()
    {
        return $this->appends['full_status'] = Selection::getValue('payment_status', $this->status);
    }

    protected function getFullPaymentTypeAttribute() {
        return $this->appends['full_payment_type'] = Selection::convertCode($this->payment_type);
    }

    protected function getFullPaymentModeAttribute()
    {
        return $this->appends['full_payment_mode'] = Selection::convertCode($this->payment_mode);
    }

    /**Mutator*/
    protected function getFullBankAttribute() {
         return Selection::getValue('bank',$this->bank);
    }

    protected function getSelectedAttribute() {
        return isset($this->attributes['selected']) ? $this->attributes['selected'] : false;
    }

    protected function setSelectedAttribute($value) {
        $this->attributes['selected'] = $value;
    }


    /* status flag  */
    public function getStatusFlagAttribute() {
        return $this->status;
    }

    /* */

    public function initPeriod($defaultMonth = 12) {
        $this->period_start = Carbon::now()->toDateTimeString();
        $this->period_end = Carbon::now()->addMonth($defaultMonth)->toDateTimeString();
        return $this;
    }

    public function setPaymentPeriod($period_start) {
        $this->period_start = Carbon::parse($period_start);
        $this->period_end = Carbon::parse($period_start)->addMonth()->subDay();
    }





    public function isClear() {
        return $this->hasStatusOf('clear');
    }

    public function isCancel() {
        return $this->hasStatusOf('cancel');
    }

    public function isBounce() {
        return $this->hasStatusOf('bounce');
    }

    public function isPending() {
        return $this->hasStatusOf('received');
    }

    public function isDeposit() {
        return $this->hasStatusOf('deposit');
    }


    public function toOutputArray()
    {
        $this->period_start = $this->period_start->toDateString();
        $this->period_end = $this->period_end->toDateString();
        $this->effectivity_date = $this->effectivity_date->toDateString();

        return $this->toArray();
    }
}
