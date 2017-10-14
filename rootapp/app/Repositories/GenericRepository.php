<?php


namespace App\Repositories;

use App\BaseModel;

class GenericRepositories {

    private $model;

    public function __construct(BaseModel $model) {
        $this->model = $model;
    }


    public function getAll($pageNum = 0,$size = 20,$callback = null) {

        $query = &$this->model;

        if(is_callable($callback)) {
            $callback($query);
        }
    }

    public function find() {

    }

    
}