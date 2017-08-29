<?php

namespace App\Listeners;

use App\Events\NotifyUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class EmailPayment
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
        if($event->eventListener->isRegistered("EmailPayment")) {
            $bill = $event->bundle->get('bill');
            $payee = $bill->payee()->first();
            if($bill) {
                Mail::to($payee->email_address)
                    ->cc(config('app.email_destination'))
                    ->send(new \App\Mail\PaymentNotification($bill));
            }
        }
    }
}
