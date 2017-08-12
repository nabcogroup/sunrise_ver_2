<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tenant extends BaseModel
{
    //

    public function __construct(array $attributes = [])
    {
        $this->type = "individual";
        $this->code = "";
        $this->full_name = "";
        $this->email_address = "";
        $this->tel_no = "";
        $this->mobile_no = "";
        $this->fax_no = "";
        $this->reg_date = \Carbon\Carbon::now()->toDateTimeString();
        $this->gender = "male";
        $this->reg_id = "";
        $this->reg_name = "";

        parent::__construct($attributes);
    }

    public function TenantAddress() {
        return $this->hasOne(TenantAddress::class);
    }

    public static function createInstance() {
        $tenant = new Tenant();
        $tenant->address_instance = TenantAddress::createInstance();
        return $tenant;

    }


    /*****************
     *  mutators
    ***************************/
    public function getFullNameAttribute($value) {
        return ucwords($value);
    }

    public function saveTenant($entity) {
        
        $addressInstance = isset($entity['address_instance']) ? $entity['address_instance'] : false;
        unset($entity['address_instance']);
        $tenant = $this->toMap($entity)->save();
        $address = new TenantAddress($addressInstance);
        $this->TenantAddress()->save($address);

        return $this;
    }

    public function fullAddress() {
        $address = $this->TenantAddress()->first()->getFullAddress();

        return $address;
    }



}
