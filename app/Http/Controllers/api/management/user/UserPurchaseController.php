<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use App\Services\management\user\UserHistoryService;
use App\Models\User;
use Illuminate\Http\Request;

class UserPurchaseController extends Controller
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
        $purchase_time = $this->user_history_service->getOrdersById($user)->count();
        return response()->json(['purchase_time' => $purchase_time], 200);
    }
}
