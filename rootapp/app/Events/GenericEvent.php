<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/24/2017
 * Time: 11:14 AM
 */

namespace App\Events;


use App\Services\Bundle;
use App\Services\EventListenerRegister;

abstract class GenericEvent
{

    protected $bundle;
    protected $eventListener;

    public function __construct(Bundle $bundle,EventListenerRegister $listener)
    {
        $this->bundle = $bundle;
        $this->eventListener = $listener;
    }



}