<?php

namespace App;

use App\Traits\HelperTrait;
use App\Traits\StringTrait;
use Carbon\Carbon;

class Expenditure extends BaseModel
{

    use HelperTrait;

    protected $table = "expenditures";

    

    protected $appends = ["full_expense_type","full_location","full_bank_provider"];


    public static function createInstance()
    {
        return new Expenditure([
           'villa_id'           => 0,
           'location'           =>  '',
           'expense_type'       => 'fixed',
           'acct_code'            =>  '',
           'payee'              =>  '',
           'payment_date'       =>  Carbon::now()->toDateString(),
           'amount'             =>  0,
           'mode_of_payment'    =>  '',     
           'bank_provider'      =>  '',
           'payment_ref'        =>  '',
           'doc_ref'            =>  '',
           'doc_no'             =>  '',
           'doc_date'           =>  Carbon::now()->toDateString(),
        ]);
    }

    /* Navigations */
    public function accounts() {
        return $this->belongsTo("App\AccountChart","acct_code","code")->select("code","description");
    }

    public function villas() {
        return $this->belongsTo("App\Villa","villa_id","id");
    }

    public function payees() {
        return $this->belongsTo("App\Payee","payee","payee_code")->select("payee_code","name");
    }

    /* Mutations */
    public function getFullExpenseTypeAttribute() {
        return $this->appends['full_expense_type'] = Selection::getValue("account_type",$this->expense_type);
    }

    public function getFullLocationAttribute() {
        return $this->appends['full_location'] = Selection::getValue("villa_location",$this->location);
    }

    public function getFullBankProviderAttribute() {

        if($this->bank_provider === null) {
            return "";
        }

        return $this->appends['full_bank_provider'] = Selection::getValue("bank",$this->bank_provider);

    }

    public function getPaymentRefAttribute($value) {

        $payment_ref = $this->formatUnderscore($value);

        return $payment_ref;
    }





    











}
