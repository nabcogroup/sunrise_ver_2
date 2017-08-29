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



    public static function createInstance() {
        $tenant = new Tenant();
        $tenant->tenant_address = TenantAddress::createInstance();
        return $tenant;

    }

    /*****************
     *  Navigation
     ***************************/
    public function TenantAddress() {
        return $this->hasOne(TenantAddress::class);
    }

    public function Villas() {

    }


    /*****************
     *  mutators
    ***************************/
    public function getFullNameAttribute($value) {
        return ucwords($value);
    }

    public function saveTenant($entity) {
        
        $addressInstance = isset($entity['tenant_address']) ? $entity['tenant_address'] : false;
        unset($entity['tenant_address']);
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
