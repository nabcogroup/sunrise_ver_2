<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/10/2017
 * Time: 3:41 PM
 */

namespace App\Repositories;


use App\Expenditure;
use App\Traits\UserTrait;

class ExpenditureRepository extends AbstractRepository
{

    protected function definedModel()
    {
        return new Expenditure();
    }

    public function createInstance() {
        return Expenditure::createInstance();
    }

    public function save($entities) {

        if(isset($entities['id']) && $entities['id'] != 0) {
            $this->model = $this->model->find($entities['id']);
        }

        $this->model->toMap($entities);
        $this->model->saveWithUser();

        return true;
    }
}