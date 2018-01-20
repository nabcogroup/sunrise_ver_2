<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class VillaGallery extends BaseModel
{
    protected $appends = ['delete_mark'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->created_at = Carbon::now();

        $this->updated_at = Carbon::now();

    }


    protected function getDeleteMarkAttribute() {

        return $this->attributes['delete_mark'] = isset($this->attributes['delete_mark']) ? $this->attributes['delete_mark'] : false;

    }


    public function setDeleteMarkAttribute($value) {

        $this->attributes['delete_mark'] = $value;
    }

}
