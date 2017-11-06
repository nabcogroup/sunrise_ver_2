<?php

namespace App\Repositories;

use App\Selection;
use Carbon\Carbon;
use App\FixedAsset;
use App\Services\EDB;
use App\Services\Result;
use Zend\Diactoros\Request;
use App\Traits\PaginationTrait;

class FixedAssetRepository extends AbstractRepository
{
    
    use PaginationTrait;

    protected function definedModel()
    {
        
        return new FixedAsset();
    }

    public function createInstance($data = array())
    {
        return FixedAsset::createInstance($data);
    }

   
    public function getAssets($property, $filter_field, $filter_value)
    {

        $fixedAssets = $this->model->orderBy('description');
        if (!is_null($filter_field)) {
            if ($filter_field == 'fixed_asset_type') {
                $selection = Selection::where('category', 'fixed_asset_type')->where('name', 'like', '%'.$filter_value.'%')->first();
                $filter_value = (!is_null($selection)) ? $selection->code : '';
            }
            $fixedAssets = $fixedAssets->where($filter_field, 'like', '%'.$filter_value.'%');
        }

        if (!is_null($property)) {
            $fixedAssets->where('property', $property);
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

    public function saveFixedAsset($entity)
    {

        try {
            if(isset($entity['id']) && $entity['id'] > 0) {

                $model = $this->model->with('depreciations')->find($entity['id']);
                $existingDepreciations = $model->depreciations->get();
                if ($existingRecord->count() > 0) {
                    throw new Exception('Cannot modify exisiting fixed asset');
                }
            }
            else {
                $model = $this->attach($entity)->instance();
            }
            
            
            
            //check if there is an existing record
            $existingDepreciations = $model->depreciations()->get();
            if ($existingRecord->count() > 0) {
                foreach ($existingDepreciations as $depreciation) {
                    $depreciation->delete();
                }
            }
        
            $num_year = $this->model->year_span;
            $current_book_value = $this->model->current_book_value;
            $depreciation_value = $this->model->depreciation_amount;
            $opening_balance_amount = $this->model->opening_amount;
            $opening_year = Carbon::parse($this->model->opening_year);

            for ($i =0; $i < $num_year; $i++) {
                
                $depreciation = $model->depreciation()->create([
                    'ob_amount'         =>  $opening_balance_amount,
                    'ob_year'           =>  $opening_year,
                    'depreciated_value' =>  $depreciation_value,
                    'book_value'        =>  $current_book_value,
                    'acct_code'         =>  '100'
                ]);
                
                $opening_balance_amount = $opening_balance_amount - $depreciation_value;
                $opening_year = $opening_year + 1;
                $current_book_value =  $current_book_value - $depreciation_value;


            }

            //create depreciation table
        }
        catch(Exception $e) {
            Result::badRequest(['message' => $e->getMessage()]);
        }
    }
}
