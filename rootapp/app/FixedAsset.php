<?php

namespace App;

use Carbon\Carbon;
use App\Selection;
use Illuminate\Database\Eloquent\Model;

class FixedAsset extends BaseModel
{

    protected $fillable = ["purchase_date","description","fixed_asset_type","property","cost","tag_code","serial_no","year_span"];
    protected $appends = ["full_fixed_asset_type","full_property","full_purchase_date","depreciation_amount","depreciation_percentage","current_book_value","current_total_year"];

    public static function createInstance($values = array()) {
        
        $fixedAsset = new FixedAsset();
        return $fixedAsset;
    }


    public function __construct($values = array()) {
        
        $this->purchase_date = Carbon::now()->toDateString();
        $this->description = "";
        $this->fixed_asset_type = "";
        $this->property = "";
        $this->cost = 0;
        $this->tag_code = "";
        $this->serial_no = "";
        $this->year_span = 5;
        $this->salvage_value = 0;
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

    public function getTotalCostForDepAttribute() {
        return $this->cost - $this->salvage_value;
    }

    public function getDepreciationPercentageAttribute() {
        if($this->cost > 0) {
            $this->appends['depreciation_percentage'] = ($this->depreciation_amount / $this->getTotalCostForDepAttribute()) * 100;
        }
        else {
            $this->appends['depreciation_percentage'] = 0;
        }
        
        return $this->appends['depreciation_percentage'];
    }

    public function getCurrentTotalYearAttribute() {
        return $this->appends['current_total_year'] = Carbon::now()->diff(Carbon::parse($this->purchase_date))->y;
    }

    public function getCurrentBookValueAttribute() {
        if($this->cost > 0) {
            $this->appends['current_book_value'] = $this->getTotalCostForDepAttribute() - ($this->current_total_year * $this->depreciation_amount);
        }
        else {
            $this->appends['current_book_value'] = 0;
        }
        return $this->appends['current_book_value'];
    }

    public function getDepreciationAmountAttribute() {
        
        if($this->cost > 0) 
        {
            $this->appends['depreciation_amount'] = ($this->getTotalCostForDepAttribute() / $this->year_span);
        }
        else {
            $this->appends['depreciation_amount'] = 0;
        }

        return $this->appends['depreciation_amount'];

    }


}
