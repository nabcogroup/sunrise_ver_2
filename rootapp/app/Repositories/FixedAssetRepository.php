<?php

namespace App\Repositories;

use App\FixedAsset;
use App\Traits\PaginationTrait;

class FixedAssetRepository extends AbstractRepository {
    
    use PaginationTrait;

    protected function definedModel() {
        
        return new FixedAsset();
    }

    public function createInstance($data = array()) {
        return FixedAsset::createInstance($data);
    }

    public function getAll() {
        $fixedAssets = $this->model->orderBy('description');

        return $this->createPagination($fixedAssets, function ($row) {
            
            $item = [
                "id"                =>  $row->id,
                "purchase_date"        =>  $row->purchase_date,
                "description"          =>  $row->description,
                "fixed_asset_type"    =>  $row->fixed_asset_type,
                "property"          =>  $row->property,
                "cost"           =>  $row->cost,
                "tag_code"    =>  $row->tag_code,
               
            ];

            return $item;
        });
    }

    
}