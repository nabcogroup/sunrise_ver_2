<?php

namespace App\Listeners;

use App\Events\NotifyUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdatePayment
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
     * @param  NotifyUpdate  $event
     * @return void
     */
    public function handle(NotifyUpdate $event)
    {
        if($event->eventListener->isRegistered("UpdatePayment")) {
            $contract = $event->bundle->get('contract');
            $bill = $contract->bill()->first();
            $payments = $bill->payments()->get();
            foreach($payments as $payment) {
                if($payment->isPending()) {
                    $payment->setStatusToCancel();
                    $payment->saveWithUser();
                }
            }
        }
    }
}
