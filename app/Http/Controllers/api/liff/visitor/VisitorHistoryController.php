<?php

namespace App\Http\Controllers\api\liff\visitor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\management\user\UserHistoryService;
use Illuminate\Http\Request;

class VisitorHistoryController extends Controller
{
    private $service;

    public function __construct(UserHistoryService $service) {
        $this->service = $service;
    }

    /**
     * Handle the incoming request.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $visitor_histories_count = $this->service->getVisitorHistoriesById($user)->count();
        return response()->json(['visitor_histories_count' => $visitor_histories_count], 200);
    }
}
