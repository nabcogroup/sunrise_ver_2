<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 11/1/2017
 * Time: 6:35 PM
 */

namespace App\Services;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EDB
{
    private $db;

    public function __construct($table)
    {
        $this->db = DB::table($table);
    }

    public static function createQuery($table) {
        return new EDB($table);
    }

    public function withSoftDelete($table = null) {
        if(!is_null($table)) {
            $deleted_at = $table.".deleted_at";
        }
        else {
            $deleted_at = "deleted_at";
        }
        $this->db = $this->db->whereNull($deleted_at);
        return $this;
    }

    public function joins($joins = array()) {
        foreach ($joins as $key => $value) {
            $values = explode('=',$value);
            $this->db = $this->db->join($key,$values[0],$values[1]);
        }

        return $this;
    }

    public function leftJoins($joins = array()) {
        foreach ($joins as $key => $value) {
            $values = explode('=',$value);
            $this->db = $this->db->leftJoin($key,$values[0],$values[1]);
        }

        return $this;
    }




    public function self(&$params = null,$callback = null) {

        $filter_field = request()->input('filter_field',null);

        if(!is_null($filter_field)) {

            $filter_value = request()->input('filter_value',null);
            if(!is_null($callback)) {
                $callback($this,$filter_field,$filter_value);
            }
            else {
                $this->db = $this->db->where($filter_field,'LIKE', '%'.$filter_value.'%');
            }

            $params['filter_field'] = $filter_field;
            $params['filter_value'] = $filter_value;

        }

        return $this->db;

    }


}