<?php

namespace App\Events;


use App\Services\Bundle;
use Illuminate\Broadcasting\Channel;

use Illuminate\Queue\SerializesModels;
use App\Services\EventListenerRegister;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


class OnCreating
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $bundle;
    public $eventListener;

    public function __construct(Bundle $bundle,EventListenerRegister $listener)
    {
        $this->bundle = $bundle;
        $this->eventListener = $listener;
    }
}
