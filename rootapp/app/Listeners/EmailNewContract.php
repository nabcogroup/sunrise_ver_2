<?php

namespace App\Listeners;


use App\Events\NotifyUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class EmailNewContract
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
        if($event->eventListener->isRegistered("EmailNewContract")) {
            $contract = $event->bundle->get('contract');
            if($contract) {
                Mail::to($contract->Tenant()->first()->email_address)
                    ->cc(config('app.email_destination'))
                    ->send(new \App\Mail\NewContract($contract));
            }
        }
    }
}
