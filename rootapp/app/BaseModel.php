<?php 


namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BaseModel extends Model {


    protected $guarded = ['id'];

    protected function setField($field,$value) {
        if(!in_array($field,$this->appends)) {
            if(is_numeric($value)) {
                eval('$this->'. $field . "=" . $value . ";");
            }
            else {
                eval('$this->'. $field . "=\"" . $value . "\";");
            }
        }
    }

   
    protected function hasStatusOf($status) {
        return $this->status == $status;
    }

    public function toMap($fields = array()) {
        if(sizeof($fields) > 0) {
            foreach ($fields as $key => $value) {
                //do not include custom attribute
                if(!in_array($key,$this->appends) && !in_array($key,$this->guarded)) {
                    $this->setField($key,$value);
                }
            }
        }

        return $this;
    }

   
    //chaining
    public function explicitSearch($fieldKey,$fieldValue) {
        return $this->where($fieldKey,$fieldValue);
    }

    public function createNewId() {

        $lastRecord = $this->orderBy('id','desc')->first();

        if($lastRecord == null)
            return 1;

        return $lastRecord->id++;
    }

    public function getId() {
        return $this->id;
    }
}
