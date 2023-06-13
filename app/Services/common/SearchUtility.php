<?php

namespace App\Services\common;

use App\Services\common\DatetimeUtility;
use Illuminate\Support\Facades\DB;

class SearchUtility
{
    public static function searchByName($query, $name)
    {
        $names = self::extractKeywords($name);
        foreach ($names as $name) {
            $query->whereRaw('CONCAT(last_name, first_name) LIKE ?', ["%{$name}%"])
                ->orWhereRaw('CONCAT(last_name_kana, first_name_kana) LIKE ?', ["%{$name}%"]);
        }
        return $query;
    }

    public static function searchByMonth($query, $month, $now)
    {
        $target_month = DatetimeUtility::subtractMonths($now, $month)->format("Y-m-d");
        $date = date('Y-m-d');
        $query->whereBetween('created_at', ["$target_month 0:00:00", "$date 23:59:59"]);
        return $query;
    }

    private static function extractKeywords(String $name, int $limit = -1): array
    {
        return array_values(array_unique(preg_split('/[\p{Z}\p{Cc}]++/u', $name, $limit, PREG_SPLIT_NO_EMPTY)));
    }
}
