<?php

namespace App\Listeners;

use App\Events\NotifyUpdate;
use App\Services\SmsGateway;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SMSNotification
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
     * @param  NotifyUpdate  $event
     * @return void
     */
    public function handle(NotifyUpdate $event)
    {
        if($event->eventListener->isRegistered("SMSNotification")) {

            $args = $event->bundle->get('smsArgs');

            if(isset($args['mobile_no']) && !empty($args['mobile_no'])) {
                $smsGateway = new SmsGateway(config('app.sms_email_address'), config('app.sms_password'));
                $deviceId = config('app.sms_device_id');
                $number = $args['mobile_no'];
                $message = $args['message'];

                $result = $smsGateway->sendMessageToNumber($number, $message, $deviceId);

            }


        }

    }
}
