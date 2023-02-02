<?php

namespace App\Services\management\report;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use App\Services\management\report\GroupingReportAction;
use App\Services\management\report\FormatReportAction;
use App\Services\common\DatetimeUtility;

class ReportService
{
    private $group_report_action;
    private $format_action;

    public function __construct(GroupingReportAction $group_report_action, FormatReportAction $format_action) {
        $this->group_report_action = $group_report_action;
        $this->format_action = $format_action;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function getUserByDate($request)
    {
        $begin_date = $request->begin_date .' 0:00:00';
        $end_date = $request->end_date .' 23:59:59';
        $users = User::whereBetween('created_at', [$begin_date, $end_date]);
        $blocks = $users->where('is_blocked', 1)->count();
        return [
            'users' => $users->count(),
            'blocks' => $blocks
        ];
    }

    public function getUserByMonth()
    {
        $begin_date = date('Y-m-01');
        $end_date = date('Y-m-t', strtotime(date('Y-m-01')));
        $users = User::whereBetween('created_at', ["$begin_date 0:00:00", "$end_date 23:59:59"]);
        $blocks = $users->where('is_blocked', 1);
        $grouping_users = $this->group_report_action->groupingDataByCreatedAt($users)->toArray();
        $grouping_blocks = $this->group_report_action->groupingDataByCreatedAt($blocks)->toArray();

        # 共通クラス（指定範囲日の配列生成）
        $months = DatetimeUtility::GetArrayThisMonthDays($begin_date, $end_date);

        $result_grouping_users = $this->format_action->mergeGroupingArray($months, $grouping_users);
        $result_grouping_blocks = $this->format_action->mergeGroupingArray($months, $grouping_blocks);

        return [
            'users' => $result_grouping_users,
            'blocks' => $result_grouping_blocks
        ];
    }

}
