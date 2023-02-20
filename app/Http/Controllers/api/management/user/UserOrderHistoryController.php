<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\management\user\UserHistoryService;
use Illuminate\Http\Request;

class UserOrderHistoryController extends Controller
{
    private $user_history_service;

    public function __construct(UserHistoryService $user_history_service) {
        $this->user_history_service = $user_history_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $orders = $this->user_history_service->getOrdersById($user);
        return response()->json(['orders' => $orders], 200);
    }
}
