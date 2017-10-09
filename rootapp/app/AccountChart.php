<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountChart extends BaseModel
{
    protected $table = "account_charts";

    protected $fillable = ["code","account_type","description"];


    /** mutator */


}
