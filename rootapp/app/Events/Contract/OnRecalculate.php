<?php

namespace App\Events\Contract;

use App\Services\Bundle;
use App\Services\EventListenerRegister;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OnRecalculate
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $bundle;
    public $eventListeners;

    public function __construct(Bundle $bundle, EventListenerRegister $eventListeners)
    {
        $this->bundle = $bundle;
        $this->eventListeners = $eventListeners;
    }

}
