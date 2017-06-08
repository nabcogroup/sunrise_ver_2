<?php


namespace App\Repositories;

use App\Selection;

class SelectionRepository extends AbstractRepository {


    protected function definedModel()
    {
        return new Selection();
    }

    public function getSelections(Array $categories = array()) {
      
      return $this->model->getSelections($categories);

    }

    public function getSelection($code) {

        $values = $this->model->where('code',$code)->first();

        return $values->name;
    }



}