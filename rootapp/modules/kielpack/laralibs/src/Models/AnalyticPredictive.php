<?php

namespace KielPack\LaraLibs\Models;


use Illuminate\Database\Eloquent\Model;
use KielPack\LaraLibs\Base\BaseModel;

class AnalyticPredictive extends BaseModel
{

    protected $table = "analytic_predictives";

    protected $fillable = ["hash_key","description","amount"];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }



}



