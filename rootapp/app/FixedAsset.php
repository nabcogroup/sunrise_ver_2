<?php

namespace App;

use Carbon\Carbon;
use App\Selection;
use Illuminate\Database\Eloquent\Model;

class FixedAsset extends BaseModel
{

    protected $appends = ["full_fixed_asset_type","full_property","full_purchase_date"];

    public static function createInstance($values = array()) {
        
        $fixedAsset = new FixedAsset();
        
        return $fixedAsset;


    }


    public function __construct() {
        $this->id = 0;
        $this->purchase_date = Carbon::now()->toDateString();
        $this->description = "";
        $this->fixed_asset_type = "furniture";
        $this->property = "sv1";
        $this->cost = 0;
        $this->tag_code = "";
    }

    public function getFullFixedAssetTypeAttribute() {
        
        return $this->appends["full_fixed_asset_type"] = Selection::getValue('fixed_asset_type',$this->fixed_asset_type);

    }

    public function getFullPropertyAttribute() {
        return $this->appends["full_property"] = Selection::getValue('villa_location',$this->property);
    }

    public function getFullPurchaseDateAttribute() {
        return $this->appends["full_purchase_date"] = Carbon::parse($this->purchase_date)->format('d, M, Y');
    }
}
