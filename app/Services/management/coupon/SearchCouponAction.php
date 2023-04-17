<?php

namespace App\Services\management\coupon;

use App\Models\Coupon;

class SearchCouponAction
{
    public function search($request)
    {
        $query = Coupon::query();

        if (isset($request->name)) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        return $query->orderBy('id', 'desc')->paginate(10);
    }
}