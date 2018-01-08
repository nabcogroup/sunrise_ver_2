<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 12/30/2017
 * Time: 1:09 PM
 */

namespace Contract\App\Http\Controllers;


use KielPack\LaraLibs\Base\Controller as BaseController;

class ContractCalendarController extends BaseController
{
    public function apiCalendar(Request $request)
    {
        try {
            $periods = $request->all();

            $eventCalendar = $this->contractRepo->getEventCalendar($periods['start'],$periods['end']);

            $calendarService = new CalendarService($eventCalendar,[
                "model"         =>  "contract",
                "base_period"   =>  "period_end_extended",
                "grace_period"  =>  "3"
            ]);

            $calendarService->create(function($collection,&$event) {
                $event["title"] = $collection->villa()->first()->villa_no ." - ".$collection->tenant()->first()->full_name;
                $event["id"]    = $collection->getId();
                $event["full_name"]   =  $collection->tenant()->first()->full_name;
                $event["contract_no"]   =  $collection->contract_no;
            });

            return $calendarService->getEvents();

        }
        catch (Exception $e) {

            return Result::badRequest(["message" => $e->getMessage()]);

        }
    }
}