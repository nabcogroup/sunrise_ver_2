<?php

namespace App\Listeners;

use App\Events\OnGetContract;
use App\Repositories\ContractRepository;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class GetContractPayments
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
     * @param  OnDisplay  $event
     * @return void
     */
    public function handle(OnGetContract $event)
    {
        if($event->eventListener->isRegistered("GetContractPayments")) {
            $contractId = $event->bundle->get("contractId");
            $repository = new ContractRepository($contractId);
            $contract = $repository->instance();

            $event->bundle->addOutput("contract",$contract);
        }
    }
}
