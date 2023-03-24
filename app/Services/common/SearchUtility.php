<?php

namespace App\Services\common;

use App\Services\common\DatetimeUtility;
use Illuminate\Support\Facades\DB;

class SearchUtility
{
    public static function searchByName($query, $name)
    {
        $query->where(DB::raw('CONCAT(last_name, first_name)'), 'like', "{$name}%")
            ->orWhere(DB::raw('CONCAT(last_name_kana, first_name_kana)'), 'like', "{$name}%");
        return $query;
    }

    public static function searchByMonth($query, $month, $now)
    {
        $target_month = DatetimeUtility::subtractMonths($now, $month)->format("Y-m-d");
        $date = date('Y-m-d');
        $query->whereBetween('created_at', ["$target_month 0:00:00", "$date 23:59:59"]);
        return $query;
    }
}
