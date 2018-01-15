<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\NotifyUpdate' => [
            'App\Listeners\UpdateVillaStatus',
            'App\Listeners\RemoveTenant',
            'App\Listeners\UpdatePayment',
            'App\Listeners\UpdateContractStatus',
            'App\Listeners\EmailNewContract',
            'App\Listeners\EmailTerminate',
            'App\Listeners\EmailPayment',
            'App\Listeners\SMSNotification'
        ],
        'App\Events\OnCreating' => [
            'App\Listeners\CreateTenant',
            'App\Listeners\GetVilla'
        ],
        'App\Events\OnCalculation' => [
            'App\Listeners\GetVillaOnRecalculate'
        ],
        'App\Events\OnGetContract' => [
            'App\Listeners\GetContract',
            'App\Listeners\GetContractPayments'],
        'App\Events\Verify' => [
            'App\Listeners\VerifyBalance',
            'App\Listeners\VerifyVillaVacancy',
            'App\Listeners\VerifyOutstandingBalance'
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
