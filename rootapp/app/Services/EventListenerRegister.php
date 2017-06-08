<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 5/23/2017
 * Time: 12:06 PM
 */

namespace App\Services;


class EventListenerRegister
{
    private $eventNames;

    public function __construct($eventNames = array())
    {
        $this->eventNames = $eventNames;
    }

    public function isRegistered($name) {
        foreach($this->eventNames as $eventName) {
            if(strtolower($eventName) == strtolower($name)) return true;
        }

        return false;
    }
}