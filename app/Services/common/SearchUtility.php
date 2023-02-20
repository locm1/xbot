<?php

namespace App\Services\common;

use Illuminate\Support\Facades\DB;

class SearchUtility
{
    public static function searchByName($query, $name)
    {
        $query->where(DB::raw('CONCAT(last_name, first_name)'), 'like', "{$name}%")
            ->orWhere(DB::raw('CONCAT(last_name_kana, first_name_kana)'), 'like', "{$name}%");
        return $query;
    }
}
