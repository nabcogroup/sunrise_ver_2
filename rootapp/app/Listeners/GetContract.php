<?php

namespace App\Listeners;

use App\Events\OnGetContract;
use App\Repositories\ContractRepository;

class GetContract
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
     * @param  OnRegister  $event
     * @return void
     */
    public function handle(OnGetContract $event)
    {
        if($event->eventListener->isRegistered("GetContract")) {

            $repository = new ContractRepository();
            if($event->bundle->get("contractNo")) {

                $contract = $repository->includeAssociates()->findByContractNo($event->bundle->get("contractNo"))->first();

            }
            else if($event->bundle->get("contractId")) {

                if($event->bundle->get("paymentIncluded")) {
                    $contract = $repository->includeAssociates()->find($event->bundle->get("contractId"));
                }
                else {
                    $contract = $repository->find($event->bundle->get("contractId"));
                }
            }



            $event->bundle->addOutput("contract",$contract);
        }
    }
}
