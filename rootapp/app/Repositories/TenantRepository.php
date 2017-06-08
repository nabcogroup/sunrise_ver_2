<?php


namespace App\Repositories;

use App\TenantAddress;
use Faker\Provider\Address;

class TenantRepository extends AbstractRepository {


    protected function definedModel() {
        return new \App\Tenant();
    }

    protected function beforeCreate(&$model)
    {
        $model['code'] = $model['reg_id'];
    }

    public function saveTenant($model) {

        $addressInstance = isset($model['address_instance']) ? $model['address_instance'] : false;
        unset($model['address_instance']);
        $tenant = $this->attach($model,"create")->instance();

        $address = new TenantAddress($addressInstance);
        $tenant->TenantAddress()->save($address);

        return $tenant;
    }

    public function withChildren() {

        $this->model = $this->model->with('TenantAddress');
       
        return $this;
    }


    
}