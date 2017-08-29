<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/12/2017
 * Time: 6:14 PM
 */

namespace App\Repositories;


use App\Payee;

class PayeeRepository extends AbstractRepository
{
    protected function definedModel()
    {
        return new Payee();
    }

    public function createInstance() {
        return Payee::createInstance();
    }

    public function save($entity) {

        if(isset($entity['id']) && $entity['id'] != 0) {
            $this->model = $this->model->find($entity['id']);
        }

        $this->model->toMap($entity);
        $this->model->save();

    }
}