<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\management\user\UserHistoryService;

class UserVisitorHistoryController extends Controller
{
    private $user_history_service;

    public function __construct(UserHistoryService $user_history_service) {
        $this->user_history_service = $user_history_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $visitor_histories = $this->user_history_service->getVisitorHistoriesById($user);
        return response()->json(['visitor_histories' => $visitor_histories], 200);
    }
}
