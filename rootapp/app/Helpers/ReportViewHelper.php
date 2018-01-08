<?php



if(!function_exists("create_calender_header")) {

    function create_calendar_header($month_from,$month_to) {

        $headers = [];

        for($i = $month_from;$i <= $month_to;$i++) {
            $headers[] = "<th class='text-center'>". date('M', mktime(0, 0, 0, $i, 10))."</th>";
        }

        return implode("",$headers);
    }

}

if(!function_exists("array_value_handling")) {
    function array_value_handling(&$sources, $value,$increase = false) {

        if(!isset($sources)) {
            $sources = $value;

        }
        else {
            if($increase) {
                $sources += $value;
            }
        }

    }
}