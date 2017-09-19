<?php


namespace App\Repositories;

use App\TenantAddress;
use App\Traits\PaginationTrait;
use Faker\Provider\Address;

class TenantRepository extends AbstractRepository {

    use PaginationTrait;

    protected function definedModel() {
        return new \App\Tenant();
    }

    protected function beforeCreate(&$model)
    {
        $model['code'] = $model['reg_id'];
    }

    protected function afterUpdate(&$model,$children = array())
    {
        $parentId = $model->getId();
        $tenantAddressModel = TenantAddress::where('tenant_id',$parentId)->get();
        foreach ($tenantAddressModel as $address) {
            $address->save($children);
        }
    }

    protected function afterCreate(&$model,$children = array()) {
        $address = new TenantAddress($children);
        $model->TenantAddress()->save($address);
    }

    public function saveTenant($model) {
        $addressInstance = isset($model['tenant_address']) ? $model['tenant_address'] : false;
        unset($model['tenant_address']);
        $tenant = $this->attach($model,$addressInstance)->instance();
        return $tenant;
    }

    public function getTenants($inputs = array()) {

        $tenants = $this->model->customFilter();
        return $this->createPagination($tenants,function($row) {
            $item = [
                'id'            =>  $row->id,
                'full_name'     =>  $row->full_name,
                'reg_id'        =>  $row->reg_id,
                'email_address' =>  $row->email_address,
                'mobile_no'     =>  $row->mobile_no,
            ];
            return $item;
        },$inputs);
    }

    public function getTenantByRegId($regId) {
        return $this->model->with('TenantAddress')->where('reg_id',$regId)->first();
    }

    public function withChildren() {

        $this->model = $this->model->with('TenantAddress');


    }


    
}