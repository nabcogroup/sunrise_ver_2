<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 10/11/2017
 * Time: 12:38 PM
 */

namespace App\Services\ReportService;


use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportParameter
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function field($name,$default = null) {

        return $this->request->query($name,$default);

    }

    public function fieldInt($name,$default = 0) {

        return (int)$this->request->query($name,$default);

    }

    public function fieldDate($name,$default = null) {

        $date = $this->request->query($name,$default);

        if(!is_null($date))  {
            return Carbon::parse($date);
        }
        else {
            return $date;
        }
    }

    public function add($name,$value) {
        $this->request->request->add([$name => $value]);
    }

    public function update($name,$value) {
        
        $this->request->merge([$name => $value]);
    }

    public function toArray() {
        return $this->request->toArray();
    }





}