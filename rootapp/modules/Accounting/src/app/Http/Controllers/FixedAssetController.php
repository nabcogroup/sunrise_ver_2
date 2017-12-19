<?php

namespace Accounting\App\Http\Controllers;



use Illuminate\Http\Request;


use Accounts\App\Models\FixedAsset;
use KielPack\LaraLibs\Base\Controller;
use KielPack\LaraLibs\Traits\PaginationTrait;
use KielPack\LaraLibs\Supports\Facades\Result;
use KielPack\LaraLibs\Selections\SelectionModel as Selection;

class FixedAssetController extends Controller
{
    use PaginationTrait;

    public function all(Request $request, $property = null) {

        $fixedAssets = FixedAsset::orderBy('description')->get();

        $filter_field = $request->input('filter_field',null);
        $filter_value = $request->input('filter_value',null);
        
        if (!is_null($filter_field)) {
            if ($filter_field == 'fixed_asset_type') {
                $selection = Selection::where('category', 'fixed_asset_type')->where('name', 'like', '%'.$filter_value.'%')->first();
                $filter_value = (!is_null($selection)) ? $selection->code : '';
            }
            $fixedAssets = $fixedAssets->where($filter_field, 'like', '%'.$filter_value.'%');
        }

        if (!is_null($property)) {
            $fixedAssets->where('property', $property);
            $request->request->add(['property' => $property]);
        }

        return $this->createPagination($fixedAssets, function ($row) {
            $item = [
                "id"                    =>  $row->id,
                "purchase_date"          =>  $row->purchase_date,
                "full_purchase_date"    =>  $row->full_purchase_date,
                "description"           =>  $row->description,
                "fixed_asset_type"      =>  $row->fixed_asset_type,
                "full_fixed_asset_type" =>  $row->full_fixed_asset_type,
                "property"              =>  $row->property,
                "full_property"         =>  $row->full_property,
                "cost"                  =>  $row->cost,
                "tag_code"              =>  $row->tag_code
            ];

            return $item;

        },$request->all());
        
    }


    public function store(Request $request) {
        
        $this->validateRequest($request);
        
        $fixedAsset = new FixedAsset($request->all());
        
        $fixedAsset->save();

        $attributes = [
            'ob_amount'                 =>  $fixedAsset->cost,

            'ob_date'                   =>  Carbon::parse($fixedAsset->purchase_date),

            'ob_year'                   =>  Carbon::parse($fixedAsset->purchase_date)->year,

            'depreciated_value'         =>  $fixedAsset->depreciation_amount,

            'acct_code'                 =>  '100',
            
            'book_value'                =>  $fixedAsset->cost - $fixedAsset->depreciation_amount,
        ];

        $num_year = $model->year_span;

        for ($i =0; $i < $num_year; $i++) {
            
            $depreciation = $model->depreciations()->create($attributes);

            $attributes['ob_amount'] = $attributes['ob_amount'] - $attributes['depreciated_value'];
            
            $attributes['ob_year'] = $attributes['ob_year'] + 1;
            
            $attributes['book_value'] = $attributes['book_value'] - $attributes['depreciated_value'];
        }

        //create depreciation table
        return true;
        
        Result::ok('Successfully Save');

    }


    public function create() {

        $instance = FixedAsset::createInstance();
        $lookups = Selection::getSelections(['villa_location','fixed_asset_type']);

        return Result::response(['instance' => $instance,'lookups' => $lookups]);

    }

    public function show($id) {

        $fixedAsset = FixedAsset::with('depreciations')->find($id);
        $lookups = Selection::getSelections(['villa_location','fixed_asset_type']);

        return  Result::response(['instance' => $fixedAsset,'lookups' => $lookups]);

    }

    public function remove() {

    }

    protected function validateRequest(Request $request) {

        $this->validate($request,[
            'purchase_date'     =>  'required|date',
            'description'       =>  'required',
            'property_code'          =>  'required',
            'fixed_asset_type'  =>  'required',
            'year_span'         =>  'required|integer|min:1',
            'salvage_value'     =>  'required',
            'cost'              =>  array("required","regex:/^\d+?|^\d+\.\d{2}?/")
        ]);
    }







}
