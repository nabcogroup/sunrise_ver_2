<?php

namespace App\Repositories;

use App\Selection;
use Carbon\Carbon;
use App\FixedAsset;
use App\Traits\PaginationTrait;
use Zend\Diactoros\Request;

class FixedAssetRepository extends AbstractRepository {
    
    use PaginationTrait;

    protected function definedModel() {
        
        return new FixedAsset();
    }

    public function createInstance($data = array()) {
        return FixedAsset::createInstance($data);
    }

   
    public function getAssets($filter_field,$filter_value) {

        $fixedAssets = $this->model->orderBy('description');
        if(!is_null($filter_field)) {
            if($filter_field == 'fixed_asset_type') {
                $selection = Selection::where('category','fixed_asset_type')->where('name','like','%'.$filter_value.'%')->first();
                $filter_value = (!is_null($selection)) ? $selection->code : '';
            }
            else if($filter_field == 'villa_location') {
                $selection = Selection::where('category','villa_location')->where('name','like','%'.$filter_value.'%')->first();
                $filter_value = (!is_null($selection)) ? $selection->code : '';
            }
            
            $fixedAssets = $fixedAssets->where($filter_field,'like','%'.$filter_value.'%');
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
                "tag_code"              =>  $row->tag_code,
               
            ];

            return $item;
        });
    }

    public function saveFixedAsset($entity) {

        $model = $this->attach($entity)->instance();

        //create depreciation table
        

    }

    
}