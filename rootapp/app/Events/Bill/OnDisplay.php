<?php

namespace App\Events\Bill;

use App\Services\Bundle;
use App\Services\EventListenerRegister;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;


class OnDisplay
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bundle;
    public $eventListeners;

    public function __construct(Bundle $bundle, EventListenerRegister $eventListeners)
    {
        $this->bundle = $bundle;
        $this->eventListeners = $eventListeners;
    }
}
