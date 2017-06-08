<?php

namespace App\Listeners;


use App\Events\NotifyUpdate;
use App\Repositories\ContractRepository;


class UpdateContractStatus
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
        if($event->eventListener->isRegistered("UpdateContractStatus")) {
            $contractId = $event->bundle->get('contractId');
            $repo = new ContractRepository($contractId);
            if($contractId != null) {
                $contractModel = $repo->instance();
                $contractModel->active()->save();
            }
        }
    }
}
