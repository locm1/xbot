<?php

namespace App\Http\Controllers\api\management\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\management\user\UserHistoryService;
use Illuminate\Http\Request;

class UserVisitorCountController extends Controller
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
        $visitor_histories_count = $this->user_history_service->getVisitorHistoriesById($user)->count();
        return response()->json(['visitor_histories_count' => $visitor_histories_count], 200);
    }
}
