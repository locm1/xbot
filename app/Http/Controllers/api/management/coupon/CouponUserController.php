<?php

namespace App\Http\Controllers\api\management\coupon;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Services\management\coupon\CouponService;
use App\Services\management\coupon\CouponUserService;
use Illuminate\Http\Request;

class CouponUserController extends Controller
{
    private $coupon_user_service;

    public function __construct(CouponUserService $coupon_user_service) {
        $this->coupon_user_service = $coupon_user_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Coupon $coupon)
    {
        $coupon_users = $this->coupon_user_service->index($coupon);
        return response()->json(['coupon_users' => $coupon_users], 200);
    }
}
