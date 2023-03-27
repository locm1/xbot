<?php

namespace App\Services\common;

use DateInterval;
use DateTime;
use DateTimeInterface;

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

    public static function addMonths($before, $month = 1)
    {
        $before_month = $before->format("n");
        $after  = $before->add(new DateInterval("P" .$month ."M"));
        $after_month  = $after->format("n");

        $result_month = $before_month + $month;
        $expect_after_month = $result_month > 12 ? $result_month - 12 : $result_month;

        if ($expect_after_month != $after_month) {
            $after = $after->modify("last day of last month");
        }

        return $after;
    }

    public static function subtractMonths($before, $month = 1)
    {
        $before_month = $before->format("n");
        $after  = $before->sub(new DateInterval("P" .$month ."M"));
        $after_month  = $after->format("n");

        $result_month = $before_month - $month;
        $expect_after_month = $result_month <= 0 ? $result_month + 12 : $result_month;

        if ($expect_after_month != $after_month) {
            $after = $after->modify("last day of last month");
        }

        return $after;
    }
}
