<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Services\liff\invite\InviteIncentiveJobService;
use Illuminate\Http\Request;

class InviteIncentiveJobController extends Controller
{
    private $service;

    public function __construct(InviteIncentiveJobService $service)
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
        $invite_incentive_job = $this->service->store($request);
        return response()->json(['invitee_user' => $invite_incentive_job], 200);
    }
}
