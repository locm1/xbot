<?php

namespace App\Services\liff\product_reservation;

use App\Models\ReserveHistory;
use App\Models\User;
use App\Services\liff\order\SearchOrderAction;
use App\Services\common\DatetimeUtility;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductReservationService
{
    private $now;
    private $search_action;

    public function __construct(SearchProductReservationAction $search_action)
    {
        $this->now = new DateTime();
        $this->search_action = $search_action;
    }

    public function index($request, User $user)
    {
        if ($request->time) {
            return $this->search_action->search($request->time, $user);
        }
        return ReserveHistory::with('product.productImages')->where('user_id', $user->id)->get();
    }

    public function store($request, User $user)
    {
        $data = $request->only(['product_id', 'quantity']);
        $deadline = DatetimeUtility::addMonths($this->now, 1)->format("Y-m-d");
        $merge_data = ['user_id' => $user->id, 'status' => 1, 'deadline' => $deadline];
        $merged_reservation = array_merge($data, $merge_data);
        return ReserveHistory::create($merged_reservation);
    }
}
