<?php

namespace Sunriseco\Properties\App\Repositories;


use Carbon\Carbon;
use Mockery\Exception;
use Illuminate\Support\Collection;
use KielPack\LaraLibs\Traits\PaginationTrait;
use Sunriseco\Properties\App\Models\Property;
use KielPack\LaraLibs\Base\AbstractRepository;
use KielPack\LaraLibs\Supports\Facades\Result;
use  KielPack\Laralibs\Repositories\BaseRepository;


class PropertyRepository extends BaseRepository
{

    use PaginationTrait;

    protected $villaObject;
    
    protected function model()
    {
        return 'Properties\Models\Property';
    }

    public function getProperties() {
        
        $params = [];

        $activeRecords = $this->model->customFilter($params);

        return $this->createPagination($activeRecords,null,$params);
    }

    public function getAvailableProperties() {

        $activeRecords = $this->model->with(['villas' => function($query) {
                $query->where('status','vacant');
        }]);

        return $activeRecords->get();
    }

    public function createProperty($data) {

        if(isset($data['villas'])) {
            $children = extract_with_unset($data,'villas');
        }
        else {
            $children = [];
        }


        $property = $this->create($data);
        if(!empty($children)) {
            foreach ($children as $child) {
                $property->villas()->create($child);
            }
        }
    }



    //override
    protected function afterCreate(&$model, $children = array())
    {

    }
}
