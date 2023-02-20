<?php

namespace App\Services\management\user;

use App\Models\User;

class UserHistoryService
{

    public function getOrdersById(User $user) 
    {
        return $user->orderHistories()->with('orderProducts.product')->get();
    }
}
