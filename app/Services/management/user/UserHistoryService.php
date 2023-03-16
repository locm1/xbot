<?php

namespace App\Services\management\user;

use App\Models\User;

class UserHistoryService
{

    public function getOrdersById(User $user) 
    {
        return $user->orders()->with('orderProducts.product')->get();
    }

    public function getVisitorHistoriesById(User $user) 
    {
        return User::find($user->id)->visitorHistories;
    }
}
