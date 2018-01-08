<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ContractTermination extends BaseModel
{

    protected $fillable = ["contract_id", "description","date_termination","ref_no"];

    public function contract() {
        return $this->belongsTo("App\Contract","contract_id");
    }



    public function clearance() {

        $contractBill = $this->contract()->first()
                            ->bill()->first();
        $contractBill->clearance($this->date_termination);

    }


    public function getDateTerminationAttribute($value) {
        return Carbon::parse($value);
    }

}
