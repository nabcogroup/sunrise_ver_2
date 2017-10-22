<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class FixedAsset extends BaseModel
{
    public static function createInstance($values = array()) {
        
        $fixedAsset = new FixedAsset();
        
        return $fixedAsset;


    }


    public function __construct() {

        $this->purchase_date = Carbon::now()->toDateString();
        $this->description = "";
        $this->fixed_asset_type = "furniture";
        $this->property = "sv1";
        $this->cost = 0;
        $this->tag_code = "";
    }
}
