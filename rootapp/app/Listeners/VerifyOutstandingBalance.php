<?php

namespace App\Listeners;

use App\Events\Verify;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mockery\Exception;


class VerifyOutstandingBalance
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Verify  $event
     * @return void
     */
    public function handle(Verify $event)
    {

        if($event->eventListener->isRegistered("VerifyOutstandingBalance")) {
            $contract = $event->bundle->get("contract");
            if($contract) {

                $amountReceivable = $contract->bill()->first()->withPendingPayments()->sum("amount");

                if($amountReceivable > 0) {
                    throw new Exception("Unable to terminate the contract there is an outstanding balance");
                }
            }
        }
    }
}
