<?php

namespace Accounting\App\Models;


use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use KielPack\LaraLibs\Base\BaseModel;

class Expenditure extends BaseModel
{
    protected $table  = "expenditures";

    protected $fillable = ["transaction_no","description", "location","villa_id","acct_code","payee_id","payment_date",
        "amount","mode_of_payment","bank_provider","payment_ref","doc_ref","doc_date","doc_no"];

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
            'doc_no'             =>  ''
        ]);

        $expenditure->payment_date = Carbon::now()->format('m/d/Y');
        $expenditure->doc_date = Carbon::now()->format('m/d/Y');

        return $expenditure;
    }


    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function setPaymentDateAttribute($value) {
        if(is_string($value)) {
            $this->attributes['payment_date'] = Carbon::parse($value);
        }
    }

    public function getPaymentDateAttribute($value) {
        if($value instanceof  Carbon) {
            return $this->attributes['payment_date']->format('m/d/Y');
        }
        else {
            return $value;
        }
    }

    public function setDocDateAttribute($value) {
        if(is_string($value)) {
            $this->attributes['doc_date'] = Carbon::parse($value);
        }
    }

    public function getDocDateAttribute($value) {
        if($value instanceof  Carbon) {
            return $this->attributes['doc_date']->format('m/d/Y');
        }
        else {
            return $value;
        }
    }

    public static function generateNewTransactionNo() {

        $lastRecord = Expenditure::orderBy('id','desc')->first();
        if($lastRecord == null) {
            $transaction = 1;
        }
        else {
            $transaction = $lastRecord->transaction_no + 1;
        }

        return $transaction;
    }

    public function scopeTransactionList($query,$value = null) {

        if(!is_null($value)) {
            return $query->select('transaction_no','doc_no',\DB::raw('SUM(amount) as total_amount'))
                    ->where('transaction_no',$value)
                    ->groupBy('transaction_no')
                    ->orderBy('doc_no');
        }
        else {
            return $query->select('transaction_no','doc_no',\DB::raw('SUM(amount) as total_amount'))
                    ->groupBy('transaction_no')
                    ->orderBy('doc_no');
        }
    }

    public function scopeGetTransaction($query,$value) {

        return $query->where('transaction_no',$value)->orderBy('id');
    }





    //******************************************
    //event of before save
    //******************************************

}