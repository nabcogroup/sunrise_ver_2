<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Payment extends BaseModel
{
    protected $appends = ['full_status','full_payment_type','full_payment_mode','selected','status_flag'];

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
            "status"                =>  "received"]);

        return $p;
    }

    /**Mutator*/
    protected function getFullStatusAttribute()
    {
        return $this->attributes['full_status'] = Selection::convertCode($this->status);
    }

    protected function getFullPaymentTypeAttribute()
    {
        return $this->attributes['full_payment_type'] = Selection::convertCode($this->payment_type);
    }

    protected function getFullPaymentModeAttribute()
    {
        return $this->attributes['full_payment_mode'] = Selection::convertCode($this->payment_mode);
    }

    protected function getSelectedAttribute() {
        return $this->attributes['selected'] = isset($this->attributes['selected']) ? $this->attributes['selected'] : false;
    }

    protected function setSelectedAttribute($value) {
        $this->attributes['selected'] = $value;
    }

    /* status flag  */
    public function getStatusFlagAttribute() {
        return $this->attributes['status_flag'] = $this->status;
    }
    /* */
    /**Mutator*/

    public function initPeriod($defaultMonth = 12) {

        $this->period_start = Carbon::now()->toDateTimeString();
        $this->period_end = Carbon::now()->addMonth($defaultMonth)->toDateTimeString();
        return $this;

    }

    public function isClear() {
        return $this->hasStatusOf('clear');
    }
    public function isCancel() {
        return $this->hasStatusOf('cancel');
    }

    public function isPending() {
        return $this->hasStatusOf('received');
    }
}
