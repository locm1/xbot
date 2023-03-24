<?php

namespace App\Services\liff\order;

use App\Models\Order;
use App\Services\common\SearchUtility;
use DateTime;
use Illuminate\Support\Facades\Log;

class SearchOrderAction
{
    private $now;

    public function __construct()
    {
        $this->now = new DateTime();
    }

    public function search($time, $user)
    {
        $query = Order::query();

        if ($time == 1) {
            SearchUtility::searchByMonth($query, 1, $this->now);
        } elseif ($time == 2) {
            SearchUtility::searchByMonth($query, 6, $this->now);
        } else {
            $query->whereYear('created_at', $time);
        }

        return $query->where('user_id', $user->id)->with('orderProducts.product.productImages')->get();
    }
}