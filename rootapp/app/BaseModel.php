<?php 


namespace App;


use App\Traits\UserTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BaseModel extends Model {

    use UserTrait;

    protected $guarded = ['id','created_at','updated_at','deleted_at'];

    protected function beforeSave() {return false;}
    protected function afterSave() {return false;}

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

   
    public function hasStatusOf($status) {
        return $this->status == $status;
    }

    public function toMap($fields = array()) {
        if(sizeof($fields) > 0) {
            foreach ($fields as $key => $value) {
                if($this->isFillable($key) && !in_array($key,$this->appends)) {
                    $this->{$key} = $value;
                }
            }
        }

        return $this;
    }

   
    //chaining
    public function explicitSearch($fieldKey,$fieldValue) {
        return $this->where($fieldKey,$fieldValue);
    }

    public function customFilter(&$params,$callback = null) {

        if(request('filter_field',false)) {
            
            $filter_field = request('filter_field');
            $filter_value = request('filter_value');

            $params['filter_field'] = $filter_field;
            $params['filter_value'] = $filter_value;

            if(!is_null($callback)) {
                $filters = $callback($this,$filter_field,$filter_value);
                if(!empty($filters)) {
                    return $this->where($filters['filter_field'],'LIKE','%'.$filters['filter_value'].'%');
                }
                else {
                    return $this;
                }
            }
            else {
                return $this->where($filter_field,'LIKE','%'.$filter_value.'%');
            }
        }

        return $this;
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

    public function save(array $options = [])
    {
        $this->beforeSave();
        return parent::save($options); // TODO: Change the autogenerated stub
    }



    public function saveWithUser() {
        $this->setUser();
        $this->save();
    }
}
