<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/20/2017
 * Time: 7:40 PM
 */

namespace App\Traits;


trait UnsetterTrait
{
    public function unsetDateStamp(&$values = array()) {

        if(isset($values['created_at'])) unset($values['created_at']);
        if(isset($values['updated_at'])) unset($values['updated_at']);
        if(isset($values['deleted_at'])) unset($values['deleted_at']);
    }

    public function unsetCustom($needles =array(), &$haystack = array()) {

        foreach ($needles as $needle) {
            if(isset($haystack[$needle])) unset($haystack[$needle]);
        }
    }


    public function sanitizeInput($value) {
        $return_val = $value == null ? '' : $value;
        return $return_val;
    }
}