<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 4/26/2018
 * Time: 5:49 PM
 */

namespace Accounting\App\Models;


use KielPack\LaraLibs\Base\BaseModel;

class AccountChart extends BaseModel
{

    protected $table = "account_charts";

    public static function createInstance() {
        return new AccountChart();
    }



    public function __construct(array $attributes = [])
    {

        if(count($attributes) == 0) {
            $this->code = "";
            $this->account_type = "";
            $this->description = "";
        }

        parent::__construct($attributes);
    }
}