<?php

namespace Accounts\App\Models;


use KielPack\LaraLibs\Base\BaseModel;

class Depreciation extends BaseModel
{

    protected $table = "depreciations";

    protected $fillable = ["fixed_asset_id", "ob_amount","ob_date", "ob_year","depreciated_value","book_value","acct_code"];

}
