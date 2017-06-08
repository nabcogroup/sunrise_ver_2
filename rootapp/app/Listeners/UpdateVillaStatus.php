<?php

namespace App\Listeners;

use App\Events\NotifyUpdate;
use App\Repositories\VillaRepository;


class UpdateVillaStatus
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
        if($event->eventListener->isRegistered("UpdateVillaStatus")) {
            $args = $event->bundle->get('villa');
            if ($args !== null) {
                //make villa occupied
                $repository = new VillaRepository($args['id']);
                if ($args["status"] == 'occupied')
                    $repository->setOccupied();
                else
                    $repository->setVacant();
            }
        }
    }
}
