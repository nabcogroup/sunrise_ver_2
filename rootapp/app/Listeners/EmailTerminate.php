<?php

namespace App\Listeners;

use App\Events\NotifyUpdate;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class EmailTerminate
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
        if($event->eventListener->isRegistered("EmailTerminate")) {
            $contract = $event->bundle->get('contract');
            $user = $event->bundle->get('user');
            if($contract) {
                Mail::to(config('app.email_destination'))->send(new \App\Mail\TerminateNotification($contract,$user));
            }
        }
    }
}
