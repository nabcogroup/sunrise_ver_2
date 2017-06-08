<?php

namespace App\Listeners;

use App\Events\OnCreating;
use App\Repositories\VillaRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class GetVilla
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
     * @param  OnCreating  $event
     * @return void
     */
    public function handle(OnCreating $event)
    {
        if($event->eventListener->isRegistered("GetVilla")) {
            $villaId = $event->bundle->get('villaId');
            if($villaId != null) {
                $repository = new VillaRepository($villaId);
                $villa = $repository->instance();
                $event->bundle->addOutput('villa',$villa);
            }
        }
    }
}
