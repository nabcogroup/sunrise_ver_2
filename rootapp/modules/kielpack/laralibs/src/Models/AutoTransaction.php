<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/20/2018
 * Time: 10:25 AM
 */

namespace KielPack\LaraLibs\Models;


use Illuminate\Database\Eloquent\Model;

class AutoTransaction extends Model
{


    protected $table = "auto_transactions";

    protected $fillable = ["module","type","increment","current","previous","next"];

    protected $default = 0;



    public function __construct(array $attributes = [])
    {
        $this->default = isset($attributes['default']) ? $attributes['default'] : 0;

        parent::__construct($attributes);

    }

    public function generate() {

        if(isset($this->attributes['current'])) {

            $current = $this->attributes['current'];

            $this->attributes['current'] = $current + $this->attributes['increment']; //increment

            $this->attributes['previous'] = $current;

            $current = $this->attributes['current'];

            $this->attributes['next'] = $current + $this->attributes['increment'];

        }
        else {

            $this->current = floatval($this->default) + $this->attributes['increment'];

            $this->next = $this->current + $this->attributes['increment'];
        }

        $this->save();
    }


}