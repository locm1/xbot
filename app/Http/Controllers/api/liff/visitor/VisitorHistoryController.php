<?php

namespace App\Http\Controllers\api\liff\visitor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\visitor\VisitorHistoryService;
use App\Services\management\user\UserHistoryService;
use Illuminate\Http\Request;

class VisitorHistoryController extends Controller
{
    private $service;
    private $visitor_history_service;

    public function __construct(UserHistoryService $service, VisitorHistoryService $visitor_history_service) {
        $this->service = $service;
        $this->visitor_history_service = $visitor_history_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $visitor_histories_count = $this->service->getVisitorHistoriesById($user)->count();
        return response()->json(['visitor_histories_count' => $visitor_histories_count], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(User $User)
    {
        $visitor_history = $this->visitor_history_service->store($User->id);
        return response()->json(['visitor_history' => $visitor_history], 200);
    }
}
