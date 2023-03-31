<?php

namespace App\Services\liff\coupon;

use App\Models\Cart;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use App\Services\liff\order\SearchOrderAction;
use App\Services\api\payjp\charge\ChargeService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CouponService
{
    public function index($request, User $user)
    {
        return $user->coupons;
    }
}
