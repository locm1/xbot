<?php

namespace App\Services\common;

use DateTime;

class DatetimeUtility
{
    public static function GetArrayThisMonthDays($begin_date, $end_date)
    {
        $months = array();

        for ($i = date('Ymd', strtotime($begin_date)); $i <= date('Ymd', strtotime($end_date)); $i++) { 
            $year = substr($i, 0,4);
            $month = substr($i, 4,2);
            $day = substr($i, 6,2);

            if (checkdate($month, $day, $year)) {
                $months[] = date('Y-m-d', strtotime($i));
            }
        }
        return $months;
    }
}
