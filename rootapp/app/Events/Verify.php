<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


use App\Services\Bundle;
use App\Services\EventListenerRegister;

class Verify
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
