<?php

namespace App\Services\management\coupon;

use App\Models\Coupon;

class CouponService
{

    private $search_coupon_action;

    public function __construct(SearchCouponAction $search_coupon_action)
    {
        $this->search_coupon_action = $search_coupon_action;
    }

    public function index($request) 
    {
        if ($request) {
            return $this->search_coupon_action->search($request);
        }
        return Coupon::orderBy('id', 'desc')->get();
    }

    public function store($request) 
    {
        $data = $request->only(['name', 'upper_limit', 'discount_price', 'code']);
        return Coupon::create($data);
    }


    public function show(Coupon $coupon): Coupon
    {
        return $coupon;
    }


    public function update($request, Coupon $coupon) 
    {
        $data = $request->only(['name', 'upper_limit', 'discount_price', 'code']);
        return $coupon->update($data);
    }


    public function destroy(Coupon $coupon) 
    {
        return $coupon->delete();
    }

}
