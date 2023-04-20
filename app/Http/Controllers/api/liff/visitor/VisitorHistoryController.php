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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        // $cart = $this->service->store($request, $user);
        // return response()->json(['cart' => $cart], 200);
    }
}
