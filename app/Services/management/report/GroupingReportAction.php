<?php

namespace App\Services\management\report;
use Illuminate\Support\Carbon;

class GroupingReportAction
{
    /**
     * 検索結果を取得して作成日ごとにグループ化
     *
     * 
     */
    
    public function groupingDataByCreatedAt($data)
    {
        $group_results = $data->orderBy('created_at')->get()->groupBy(function ($row) {
            return Carbon::parse($row['created_at'])->format('Y-m-d');
        })->map(function ($item) {
            return $item->count();
        });
        return $group_results;
    }

}
