<?php

namespace App\Repositories;

use App\FixedAsset;

class FixedAssetRepository extends AbstractRepository {

    protected function definedModel() {
        
        return new FixedAsset();
    }

    public function createInstance($data = array()) {
        return FixedAsset::createInstance($data);
    }

    
}