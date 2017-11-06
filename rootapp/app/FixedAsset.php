<?php

namespace App;

use App\Traits\HelperTrait;
use App\Traits\MemoizationTrait;
use Carbon\Carbon;
use App\Selection;
use App\Depreciation;
use Illuminate\Database\Eloquent\Model;

class FixedAsset extends BaseModel
{

    use HelperTrait;


    protected $fillable = [
        "purchase_date",
        "description",
        "fixed_asset_type",
        "property", "cost",
        "tag_code",
        "serial_no",
        "year_span"];

    protected $appends = [
        "full_fixed_asset_type",
        "full_property",
        "full_purchase_date",
        "depreciation_amount",
        "total_cost_for_dep",
    ];


    public static function createInstance($values = array())
    {

        $fixedAsset = new FixedAsset();
        return $fixedAsset;
    }

    public function __construct($attributes = array())
    {
        if (empty($attributes)) {

            $this->fill([
                'purchase_date' => Carbon::now()->toDateString(),
                'cost' => 0,
                'year_span' => 5,
                'salvage_value' => 0,
                'opening_date' => Carbon::now(),
                'opening_amount' => 0
            ]);
        }

    }

    // DEFINE RELATIONSHIPS --------------------------------------------------

    // each fixed asset has many depreciations
    public function depriciations()
    {
        return $this->hasMany(Depreciation::class, 'fixed_asset_id', 'id');
    }

    //END -----------------------------------------------


    //MUTATORS -------------------------------------------------

    //make sure to always have int value
    public function setYearSpanAttribute($value)
    {
        if ($value == null) {
            $this->attributes['year_span'] = 0;
        }
    }

    //ACCESSOR----------------------------------------------------

    //convert the fixed_asset_type to full desc
    public function getFullFixedAssetTypeAttribute()
    {
        return Selection::getValue('fixed_asset_type', $this->fixed_asset_type);
    }

    //convert the property to full desc
    public function getFullPropertyAttribute()
    {
        return Selection::getValue('villa_location', $this->property);
    }

    //convert the purchase date to proper format date
    public function getFullPurchaseDateAttribute()
    {
        return Carbon::parse($this->purchase_date)->format('d, M, Y');
    }

    /*
        to get the total cost to depreciate (p - s)
    */
    public function getTotalCostForDepAttribute()
    {
        $total_cost_for_dep = $this->cost - $this->salvage_value;
        return $total_cost_for_dep;
    }

    /*
        Depreciation amount = TCTD / LIFE
    
    */
    public function getDepreciationAmountAttribute()
    {
        return $this->breakApart($this->total_cost_for_dep, $this->year_span);
    }
}
