<?php

namespace App\Services\liff\product_reservation;

use App\Models\Order;
use App\Models\ReserveHistory;
use App\Services\common\DatetimeUtility;
use App\Services\common\SearchUtility;
use DateTime;
use Illuminate\Support\Facades\Log;

class SearchProductReservationAction
{
    private $now;

    public function __construct()
    {
        $this->now = new DateTime();
    }

    public function search($time, $user)
    {
        $query = ReserveHistory::query();

        if ($time == 1) {
            SearchUtility::searchByMonth($query, 1, $this->now);
        } elseif ($time == 2) {
            SearchUtility::searchByMonth($query, 6, $this->now);
        } else {
            $query->whereYear('created_at', $time);
        }

        return $query->where('user_id', $user->id)->with('product.productImages')->get();
    }
}