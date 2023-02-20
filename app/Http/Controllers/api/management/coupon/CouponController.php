<?php

namespace App\Http\Controllers\api\management\coupon;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Services\management\coupon\CouponService;
use App\Http\Requests\management\coupon\UpdateCouponRequest;
use App\Http\Requests\management\coupon\StoreCouponRequest;
use Illuminate\Http\Request;

class CouponController extends Controller
{

    private $coupon_service;

    public function __construct(CouponService $coupon_service)
    {
        $this->coupon_service = $coupon_service;
    }

    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $coupons = $this->coupon_service->index($request);
        return response()->json(['coupons' => $coupons], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCouponRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCouponRequest $request)
    {
        $coupon = $this->coupon_service->store($request);
        return response()->json(['coupon' => $coupon], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {
        $coupon = $this->coupon_service->show($coupon);
        return response()->json(['coupon' => $coupon], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCouponRequest  $request
     * @param  Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        $coupon = $this->coupon_service->update($request, $coupon);
        return response()->json(['coupon' => $coupon], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        $this->coupon_service->destroy($coupon);
        return response()->json([], 204);
    }
}
