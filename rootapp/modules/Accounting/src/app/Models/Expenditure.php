<?php

namespace Accounting\App\Models;


use Carbon\Carbon;
use KielPack\LaraLibs\Base\BaseModel;
use KielPack\LaraLibs\Helpers\GAT;

class Expenditure extends BaseModel
{
    protected $table  = "expenditures";

    protected $fillable = ["transaction_no","description", "location",
                            "villa_id","acct_code","payee_id","payment_date",
                            "amount","mode_of_payment","bank_provider","payment_ref",
                            "doc_ref","doc_date","doc_no","posted"];

    protected $appends = ["transaction_status"];

    public static function createInstance() {

        $expenditure = new Expenditure([
            'villa_id'           => 0,
            'location'           =>  '',
            'expense_type'       => '',
            'acct_code'          =>  '',
            'payee_id'           =>  null,
            'description'        => '',
            'amount'             =>  0,
            'mode_of_payment'    =>  '',
            'bank_provider'      =>  '',
            'payment_ref'        =>  '',
            'doc_ref'            =>  '',
            'doc_no'             =>  '',
        ]);

        $expenditure->payment_date = Carbon::now()->format(config('format.date_format'));

        $expenditure->doc_date = Carbon::now()->format(config('format.date_format'));

        return $expenditure;
    }

    public static function generateNewTransactionNo() {

        $newTransaction = GAT::create('expenses','inc',5,1);

        $newTransaction->generate();

        return $newTransaction->current;
    }


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    protected function setPaymentDateAttribute($value) {
        if(is_string($value)) {
            $this->attributes['payment_date'] = Carbon::parse($value);
        }
    }

    protected function getPaymentDateAttribute($value) {
        if($value instanceof  Carbon) {
            return $this->attributes['payment_date']->format('m/d/Y');
        }
        else {
            return $value;
        }
    }

    protected function setDocDateAttribute($value) {
        if(is_string($value)) {
            $this->attributes['doc_date'] = Carbon::parse($value);
        }
    }

    protected function getDocDateAttribute($value) {
        if($value instanceof  Carbon) {
            return $this->attributes['doc_date']->format('m/d/Y');
        }
        else {
            return $value;
        }
    }


    protected function getTransactionStatusAttribute($value) {
        if(isset($this->attributes['posted'])) {
            return $this->attributes['posted'] == 1 ? 'Posted' : 'Un-Posted';
        }
        return null;
    }




    public function scopeTransactionList($query,$value = null) {

        if(!is_null($value)) {
            return $query->select('transaction_no','doc_no','posted',\DB::raw('SUM(amount) as total_amount'))
                    ->where('transaction_no',$value)
                    ->groupBy('transaction_no');

        }
        else {
            return $query->select('transaction_no','doc_no','posted', \DB::raw('SUM(amount) as total_amount'))
                    ->groupBy('transaction_no');

        }
    }

    public function scopeGetTransaction($query,$value) {

        return $query->select('*')->where('transaction_no',$value)->orderBy('id');
    }





    //******************************************
    //event of before save
    //******************************************

}