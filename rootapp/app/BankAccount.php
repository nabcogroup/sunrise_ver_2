<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BankAccount extends BaseModel
{
    protected $table = "bank_accounts";

    public function payments() {
        return $this->hasMany("App\Payment","bank_account","account_no");
    }



}
