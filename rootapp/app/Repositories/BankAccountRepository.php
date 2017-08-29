<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/9/2017
 * Time: 4:19 PM
 */

namespace App\Repositories;


use App\BankAccount;

class BankAccountRepository extends AbstractRepository
{

    protected function definedModel()
    {
        return new BankAccount();
    }


}