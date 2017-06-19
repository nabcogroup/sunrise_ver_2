<?php

namespace App\Repositories;

use App\VillaGallery;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class VillaRepository extends AbstractRepository {

    protected $villaObject;
    
    protected function definedModel() {
        return new \App\Villa();
    }

    public function includeGalleries() {
        $this->model = $this->model->with('villaGalleries');
        return $this;
    }

    public function getAll() {
        return $this->model->select('id','created_at','villa_no','electricity_no','water_no','qtel_no','rate_per_month','location','status','villa_class')->get();
    }

    public function getAllVacant() {
        return $this->model->where('status','vacant')->get();
    }

    public function searchVilla($field,$value) {
        return $this->model
            ->where($field,'like','%'.$value.'%')
            ->select('id','created_at','villa_no','electricity_no','water_no','qtel_no','rate_per_month','location','status','villa_class')
            ->get();
    }

    public function getStatusCount() {
        
        return $this->model->statusCount();

    }

    public function setOccupied() {
        $this->model->setToOccupied()->save();
        return true;
    }

    public function setVacant() {
        
        $this->model->setToVacant()->save();

        return true;
    }

    public function saveVilla($entity) {
        try {
                $collectionGallery = isset($entity['galleries']) ? $entity['galleries'] : [];
                $deleteMarks = isset($entity['villaGalleriesDeleteMark']) ?  $entity['villaGalleriesDeleteMark'] : [];

                unset($entity['galleries']);
                unset($entity['villaGalleriesDeleteMark']);

                if(!isset($entity['id']) || $entity['id'] == 0) {
                    $villa = $this->definedModel();
                    $entity['status'] = 'vacant';
                    $villa->toMap($entity)->save();
                }
                else {
                    //default status
                    $villa = $this->find($entity['id']);
                    $villa->toMap($entity)->save();
                }

                //save collection
                if(sizeof($collectionGallery) > 0) {
                    $villa->VillaGalleries()->saveMany(array_map(function($item) {
                        return new VillaGallery($item);
                    },$collectionGallery));
                }
                
                //deleting gallery
                if(sizeof($deleteMarks) > 0) {
                    foreach ($deleteMarks as $mark)
                    {
                        $villa->VillaGalleries()->find($mark)->delete();
                    }
                }
        }
        catch(Exception $e) {
            Result::badRequest(["message" => $e->getMessage()]);
        }

        return true;

    }


    public function create($defaults = array()) {
        return $this->model->createInstance();
    }

    protected function beforeCreate(&$model) {
        $model['status'] = "vacant"; //default
    }
}

