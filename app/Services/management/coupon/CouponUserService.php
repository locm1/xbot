<?php

namespace App\Services\management\coupon;

use App\Models\Coupon;
use App\Models\CouponUser;
use App\Services\management\AbstractManagementService;

class CouponUserService
{

    public function index($coupon) 
    {
        return $coupon->users;
    }
}
