<?php

namespace App\Services\management\report;

use App\Models\OrderProduct;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use App\Services\management\report\GroupingReportAction;
use App\Services\management\report\FormatReportAction;
use App\Services\common\DatetimeUtility;
use Carbon\Carbon;

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
        return [
            'users' => $users->count(),
            'blocks' => $users->where('is_blocked', 1)->count()
        ];
    }

    public function getUserByMonth()
    {
        $begin_date = date('Y-m-01');
        $end_date = date('Y-m-t', strtotime($begin_date));
        $users = User::whereBetween('created_at', ["$begin_date 0:00:00", "$end_date 23:59:59"]);
        $grouping_users = $this->group_report_action->groupingDataByCreatedAt($users)->toArray();
        $grouping_blocks = $this->group_report_action->groupingDataByCreatedAt($users->where('is_blocked', 1))->toArray();

        # 共通クラス（指定範囲日の配列生成）
        $months = DatetimeUtility::GetArrayThisMonthDays($begin_date, $end_date);

        $result_grouping_users = $this->format_action->mergeGroupingArray($months, $grouping_users);
        $result_grouping_blocks = $this->format_action->mergeGroupingArray($months, $grouping_blocks);

        return [
            'users' => $result_grouping_users,
            'blocks' => $result_grouping_blocks
        ];
    }

    public function getTopSellingProductsFromLastMonth()
    {
        $begin_date = date('Y-m-01');
        $end_date = date('Y-m-t', strtotime($begin_date));
        $order_products = OrderProduct::whereBetween('created_at', ["$begin_date 0:00:00", "$end_date 23:59:59"])->with('product.productImages');
        return $order_products->get()->groupBy(function ($row) {
            return $row->product_id;
        })->map(function ($item) {
            return [
                'count' => $item->count(),
                'id' => $item[0]->product_id,
                'name' => $item[0]->product->name,
                'stock_quantity' => $item[0]->product->stock_quantity,
                'product_images' => $item[0]->product->productImages,
            ];
        })->sortByDesc('count')->take(20);
    }

}
