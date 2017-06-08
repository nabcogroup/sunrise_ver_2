<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;


use App\Events\Verify;
use App\Repositories\BillRepository;
use App\Bill;

class VerifyBalance
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
         if($event->eventListener->isRegistered("VerifyBalance")) {
            $contract = $event->bundle->get("contract");
            if($contract) {
                $repo = new BillRepository();
                $bill = $repo->explicitQuery('contract_id',$contract->getId())->get();
                

            }
         }
    }
}
