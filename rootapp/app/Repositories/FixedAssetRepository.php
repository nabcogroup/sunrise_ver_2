<?php

namespace App\Repositories;

use Carbon\Carbon;
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
                "purchase_date"        =>  Carbon::parse($row->purchase_date)->format('d, M, Y'),
                "description"          =>  $row->description,
                "fixed_asset_type"    =>  $row->full_fixed_asset_type,
                "property"          =>  $row->full_property,
                "cost"           =>  number_format($row->cost,2),
                "tag_code"    =>  $row->tag_code,
               
            ];

            return $item;
        });
    }

    
}