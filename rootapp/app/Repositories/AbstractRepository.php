<?php

namespace App\Repositories;

use Carbon\Carbon;

abstract class AbstractRepository {

    protected $model;

    protected abstract function definedModel();

    public function __construct($id = null) {

        $this->model = $this->definedModel();
        if($id != null) {
            $this->model = $this->model->find($id);
        }
    }

    protected function beforeCreate(&$model,&$source) {return false;}
    protected function afterCreate(&$model,$children = array()) {return false;}
    protected function beforeUpdate(&$model) {return false;}
    protected function afterUpdate(&$model,$children = array()) {return false;}

    public function findById($id,$key = 'id') {

        $this->model = $this->model->where($key,$id);

        return $this;
    }

    public function orderBy($orderBy,$ordered) {
        $this->model = $this->model->orderBy($orderBy,$ordered);

        return $this;
    }

    public function getAll() {
        $result = $this->model->all();
        $this->model = $this->definedModel();
        return $result;
    }

    public function getWithLimit($limit) {

        return $this->model->limit($limit)->get();

    }

    public function get() {

        $result = $this->model->get();
        $this->model = $this->definedModel();
        return $result;
    }

    public function single() {
        return $this->model->first();
    }

    public function instance() {
        $model = $this->model;
        $this->model = $this->definedModel();
        return $model;
    }

    public function paginate($pageSize) {

        $this->model = $this->model->paginate($pageSize);
        return $this->model;
    }

    public function find($id){
        return $this->model->find($id);
    }

    public function ownedBy($userId) {

        $this->model = $this->model->where('user_id',$userId);

        return $this;
    }

    public function explicitQuery($field,$value,$opt='=') {
        $this->model = $this->model->where($field,$opt,$value);
        return $this;
    }

    public function includes(Array $includeNodes = array()) {
        $this->model = $this->model->with($includeNodes);
        return $this;
    }


    //command operation*******************************************
    /**
     * @param $model
     * @param string $state
     * @param array $exclude
     * @return $this
     */
    public function attach($model,$children = array(),$includeUser=false) {

        $childrenModel = [];
        if(isset($model['id']) && $model['id'] != 0) {
            $state = "modify";
        }
        else {
            $state = "create";
        }
        try {
            if($state == "create") {
                $this->model = $this->definedModel();
                $this->beforeCreate($model,$this->model);
                $this->model->toMap($model);
                if($includeUser)
                    $this->model->saveWithUser();
                else
                    $this->model->save();

                $this->afterCreate($this->model,$children);
            }
            else if($state == "modify") {
                $this->beforeUpdate($model);
                $this->model = $this->model->find($model['id']);
                $this->model->toMap($model);

                if($includeUser)
                    $this->model->saveWithUser();
                else
                    $this->model->save();

                $this->afterUpdate($this->model,$children);
            }
        }
        catch(Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $this;
    }

    public function remove($id) {
        return $this->model->find($id)->delete();
    }

}