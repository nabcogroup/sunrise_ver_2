<?php


namespace KielPack\LaraLibs\Helpers;

use Illuminate\Database\Eloquent\Model;
use KielPack\LaraLibs\Models\AutoTransaction;

class GAT
{
    public static function create($module,$type,$default = 0,$increment = 1) {

        $auto = AutoTransaction::where('module', $module)->first();

        if(!$auto) {
            $auto = new AutoTransaction(["module" => $module, "type" => $type, "default" => $default, "increment" => $increment]);
        }

        return $auto;

    }



}