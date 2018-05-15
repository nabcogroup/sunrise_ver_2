<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountChart extends BaseModel
{
    protected $table = "account_charts";

    protected $fillable = ["code","account_type","description"];


    /** mutator */
    public static function createInstance($values = array()) {

        return new AccountChart($values);

    }

    public function __construct($values = array()) {

        $this->code = "";

        $this->account_type = "";

        $this->description = "";

    }


}
