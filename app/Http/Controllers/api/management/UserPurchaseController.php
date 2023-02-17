<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use App\Models\User;
use Illuminate\Http\Request;

class UserPurchaseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        return ['purchase_time' => $user->orderHistories()->count()];
    }
}
