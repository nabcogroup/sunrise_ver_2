<?php

namespace App\Listeners;


use App\Events\NotifyUpdate;
use App\Tenant;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class RemoveTenant
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
        if($event->eventListener->isRegistered("RemoveTenant")) {
            $tenantId = $event->bundle->get('tenantId');
            if($tenantId != null) {
                $tenant = Tenant::find($tenantId);
                $tenant->delete();
            }
        }
    }
}
