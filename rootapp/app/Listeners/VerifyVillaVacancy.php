<?php

namespace App\Listeners;

use App\Events\Verify;
use App\Repositories\VillaRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerifyVillaVacancy
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
        if($event->eventListener->isRegistered("VerifyVillaVacancy")) {

            $repo = new VillaRepository();
            $vacant = $repo->getAllVacant();
            $count = $vacant->count();
            $event->bundle->addOutput('count',$count);
        }

    }
}
