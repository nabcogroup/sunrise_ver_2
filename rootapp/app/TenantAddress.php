<?php

namespace App;

class TenantAddress extends BaseModel
{
    public $timestamps = false;
    
    
    public function __construct(array $attributes = [])
    {
        $this->address_1 = "";
        $this->address_2 = "";
        $this->city = "";
        $this->postal_code = "";

        parent::__construct($attributes);
    }

    public static function createInstance() {
        return new TenantAddress();

    }

    public function getFullAddress() {

        return $this->address_1 . " " . $this->address_2 . " " . $this->city . " " . $this->postal_code;
    }
}
