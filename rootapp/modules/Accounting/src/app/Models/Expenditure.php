<?php

namespace Accounting\App\Models;


use Carbon\Carbon;
use KielPack\LaraLibs\Base\BaseModel;

class Expenditure extends BaseModel
{
    protected $table  = "expenditures";

    protected $fillable = ["transaction_no","description", "location","villa_id","acct_code","payee_id","payment_date",
        "amount","mode_of_payment","bank_provider","payment_ref","doc_ref","doc_date","doc_no"];

    public static function createInstance() {

        return new Expenditure([
            'villa_id'           => 0,
            'location'           =>  '',
            'expense_type'       => 'fixed',
            'acct_code'          =>  '',
            'payee_id'           =>  null,
            'payment_date'       =>  Carbon::now()->toDateString(),
            'description'        => '',
            'amount'             =>  0,
            'mode_of_payment'    =>  '',
            'bank_provider'      =>  '',
            'payment_ref'        =>  '',
            'doc_ref'            =>  '',
            'doc_no'             =>  '',
            'doc_date'           =>  Carbon::now()->toDateString(),
        ]);
    }

    public function __construct(array $attributes = [])
    {

        parent::__construct($attributes);
    }



    public static function generateNewTransactionNo() {

        $lastRecord = Expenditure::orderBy('id','desc')->first();
        if($lastRecord == null) {
            return 1;
        }

        $transaction = $lastRecord->transaction_no + 1;

        return $transaction;
    }

    public function scopeTransactionList($query,$value = null) {

        if(!is_null($value)) {
            return $query->select('*')->where('transaction_no',$value)->orderBy(self::CREATED_AT);
        }
        else {
            return $query->select('transaction_no')->distinct()->orderBy('transaction_no');
        }
        
    }





    //******************************************
    //event of before save
    //******************************************

}