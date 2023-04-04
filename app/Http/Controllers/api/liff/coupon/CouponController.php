<?php

namespace App\Http\Controllers\api\liff\coupon;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\coupon\StoreCouponRequest;
use App\Models\User;
use App\Services\liff\coupon\CouponService;
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
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $coupons = $this->coupon_service->index($user);
        return response()->json(['coupons' => $coupons], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCouponRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCouponRequest $request, User $user)
    {
        $coupon = $this->coupon_service->store($request, $user);
        return response()->json(['coupon' => $coupon], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
