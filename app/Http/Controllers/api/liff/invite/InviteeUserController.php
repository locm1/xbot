<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Services\liff\invite\InviteeUserService;
use Illuminate\Http\Request;

class InviteeUserController extends Controller
{
    private $service;

    public function __construct(InviteeUserService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $invitee_users = $this->service->index($request);
        return response()->json(['invitee_users' => $invitee_users], 200);
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $invitee_user = $this->service->store($request);
        return response()->json(['invitee_user' => $invitee_user], 200);
    }
}
