<?php

namespace App\Services\management\report;

class FormatReportAction
{
    /**
     * Display the specified resource.
     *
     * @param  array $months
     * @return array grouping_data
     */

    public function mergeGroupingArray($months, $grouping_data): array
    {
        $result_grouping_data = array();
        # 1ヶ月のリストから、グループ化した日付のキーが存在しないものを取得し、配列をマージ
        $results = array_diff($months, array_keys($grouping_data));
        $other_days = array_fill_keys(array_values($results), 0);
        $merge_grouping_data = array_merge($grouping_data, $other_days);
        ksort($merge_grouping_data);

        foreach ($merge_grouping_data as $key => $value) {
            $result_grouping_data[] = [
                'date' => $key,
                'value' => $value
            ];
        }
        return $result_grouping_data;
    }
}
