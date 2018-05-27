<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/26/2018
 * Time: 10:14 AM
 */

namespace Accounting\app\Listeners;


use Accounting\App\Events\OnSaveTransaction;

class SaveTransactionListener
{

    public function __construct()
    {

    }


    public function handle(OnSaveTransaction $event) {

        $transaction = $event->transaction;

        $event->predictive->addDictionary($transaction['description'],$transaction['amount']);

    }
}