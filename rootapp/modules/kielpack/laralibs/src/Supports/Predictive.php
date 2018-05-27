<?php

namespace KielPack\LaraLibs\Supports;


use Illuminate\Support\Facades\Hash;
use KielPack\LaraLibs\Models\AnalyticPredictive;

class Predictive
{
    protected  $predictive;

    protected $cache = [];

    public function __construct(AnalyticPredictive $predictive)
    {
        $this->predictive = $predictive;
    }

    public function addDictionary($description,$amount) {

        $hashKey = hash('sha256', strtolower($description));

        if($this->isExist($hashKey)) return false;

        AnalyticPredictive::create(["hash_key" => $hashKey, "description" => $description,"amount" => $amount]);

        return true;

    }


    public function getAllDictionaries() {

        return AnalyticPredictive::orderBy('description')->select('description','amount')->get();
    }


    public function isExist($hashKey) {

        if(count($this->cache) > 0) {
            if(in_array($hashKey,$this->cache,true)) {
                return true;
            }
        }

        $this->cache[] = $hashKey;
        $existingPredictive = AnalyticPredictive::where('hash_key',$hashKey)->first();
        if($existingPredictive) {
            return true;
        }

        return false;
    }


}