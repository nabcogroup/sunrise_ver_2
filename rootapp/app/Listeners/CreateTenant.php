<?php

namespace App\Listeners;

use App\Events\OnCreating;
use App\Repositories\TenantRepository;
use App\Tenant;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateTenant
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
        if($event->eventListener->isRegistered("CreateTenant")) {

            $entity = $event->bundle->get('tenant');
            if($entity != null) {
                //check if tenant exist
                $tenant = Tenant::where('reg_id',$entity['reg_id'])->first();
                if($tenant == null) {
                    $tenantRepo = new TenantRepository();
                    $tenant = $tenantRepo->saveTenant($entity);
                }
                $event->bundle->addOutput("tenant",$tenant);
            }
        }
    }
}
