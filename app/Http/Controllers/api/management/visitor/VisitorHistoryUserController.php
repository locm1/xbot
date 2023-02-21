<?php

namespace App\Http\Controllers\api\management\visitor;

use App\Http\Controllers\Controller;
use App\Models\VisitorHistory;
use App\Services\management\visitor_history\VisitorHistoryUserService;
use Illuminate\Http\Request;

class VisitorHistoryUserController extends Controller
{
    private $history_user_service;

    public function __construct(VisitorHistoryUserService $history_user_service) {
        $this->history_user_service = $history_user_service;
    }

    /**
     * Handle the incoming request.
     *
     * @param  VisitorHistory  $visitor_history
     * @return \Illuminate\Http\Response
     */
    public function __invoke(VisitorHistory $visitor_history)
    {
        $user = $this->history_user_service->getUserByVisitorHistory($visitor_history);
        return response()->json(['visitor_history_user' => $user], 200);
    }
}
