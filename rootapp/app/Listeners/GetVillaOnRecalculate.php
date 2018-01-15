<?php

namespace App\Listeners;

use App\Events\OnCalculation;
use App\Repositories\VillaRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class GetVillaOnRecalculate
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
     * @param  OnRecalculate  $event
     * @return void
     */
    public function handle(OnCalculation $event)
    {
        if($event->eventListener->isRegistered("GetVillaOnRecalculate"))
        {

            $villaId = $event->bundle->get("villaId");

            if($villaId != null) {

                $repository = new VillaRepository($villaId);

                $villa = $repository->instance();

                $event->bundle->addOutput('villa',$villa);
            }
        }


    }
}
