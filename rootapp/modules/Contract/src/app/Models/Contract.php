<?php

namespace Contract\Models;


use KielPack\LaraLibs\Selections\SelectionModel as Selection;
use KielPack\LaraLibs\Base\BaseModel;

class Contract extends BaseModel
{
    protected $table = "contracts";


    public function bill() {
        return $this->hasMany("Contract\Models\ContractBill","contract_id","id");
    }

    /*mutator and accessor*/
    protected function getFullStatusAttribute() {
        return $this->attributes['full_status'] = Selection::convertCode($this->status);
    }
    /**************************/

    public function hasDue() {

    }

    public function expiryContractDisplay() {

    }

}