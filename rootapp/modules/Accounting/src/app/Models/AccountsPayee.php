<?php

namespace Accounting\App\Models;


use KielPack\LaraLibs\Base\BaseModel;

class AccountsPayee extends BaseModel
{
    protected $table = "payees";

    protected $fillable = ["name","full_address","contact_no","fax_no","email_address","contact_person","payee_type"];

    public static function createInstance() {
        return new AccountsPayee([
            "payee_code"        =>  "",
            "name"              =>  "",
            "full_address"      =>  "",
            "contact_no"        =>  "",
            "fax_no"            =>  "",
            "email_address"     =>  "",
            "contact_person"    =>  "",
            "payee_type"        =>  "supplier"
        ]);
    }


    protected function beforeSave()
    {
        if($this->payee_code == '') {
            //set payee code
            $type = $this->payee_type;
            if($type == 'supplier') {
                $this->payee_code = "spl-".$this->createNewId();
            }
            else {
                $this->payee_code = "gov-".$this->createNewId();
            }
        }
    }



}