<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/17/2017
 * Time: 10:43 AM
 */

namespace App\Traits;


trait QuerySoftDeleteTrait
{
    public function createDb($table) {

        return \DB::table($table)
                ->whereNull($table.'.deleted_at');


    }
}