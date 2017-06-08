<?php


namespace App\Repositories;

use Carbon\Carbon;

abstract class BaseRepository {

    protected $modelCollection;
    
    protected $emptyModel;

    protected $counts;

    protected $isCreate = false;

    public abstract function includeCount();

    public abstract function withChildren();

    public abstract function create();
    
    public abstract function forEdit($id);

    protected abstract function beforeAttached();
    
    //*******************chaining**********************
    public function findById($id) {

        $this->modelCollection = $this->modelCollection->find($id);
        
        return $this;

    }

    public function active() {
        
        $this->modelCollection = $this->modelCollection->where('is_active',1);
        
        return $this;
    }
  

    public function withStatus($status) {

        $this->modelCollection = $this->modelCollection->where('status',$status);

        return $this;
    }

     public function markDeleted() {
        
        $this->modelCollection->is_active = 0;
        
        return $this;
    }


    //********************end chaining**********************

    public function getAll($orderBy = "id") {

        if(isset($this->counts)) {
            
            return [
                "data" =>  $this->modelCollection->active()->orderBy($orderBy)->get(),
                "counts" => $this->counts
                ];
        }
        else {

            return  $this->modelCollection->active()->orderBy($orderBy)->get();
            
        }
    }

  
    //return object************************************** 
    public function single($id) {

        return $this->modelCollection->find($id);
    
    }

    public function firstOrDefault($id = null) {

        return isset($id) ? $this->modelCollection->find($id) : $this->modelCollection->firstorFail();
    }

    public function getInstance() {
        return $this->modelCollection;
    }

   
    //command operation*******************************************
    public function attach($model,$state = "auto") {

        $this->emptyModel = $model;
        
        $this->beforeAttached();

        if($state == "auto") {
            if(!isset($this->emptyModel['id']) || $this->emptyModel['id'] == 0) {
                $state = "create";
            }
            else {
                $state = "modify";
            }
        }

        if($state == "create") {
            $this->emptyModel['created_at'] = Carbon::now();

            $this->emptyModel['updated_at'] = Carbon::now();

            $this->modelCollection->create($this->emptyModel);
        }
        else if($state == "modify") {
            $this->modelCollection = $this->firstOrDefault($this->emptyModel['id']);

            foreach($this->emptyModel as $key => $value) {
                $this->modelCollection->setField($key,$value);
            }
        }

        $this->modelCollection = $this->modelCollection;

        return $this;
    }

     public function saveChanges() {
        try {

            $this->modelCollection->updated_at = Carbon::now();

            $this->modelCollection->save();

            return true;
        }
        catch(Exception $e) {
            dd($e->getMessage());
        }
    }

    public function createNewId() {

        $lastRecord = $this->modelCollection->orderBy('id','desc')->first();
        
        if($lastRecord == null) 
            return 1;

        return $lastRecord->id++;
    }
}