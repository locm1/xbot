<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Models\InviteeIncentiveUser;
use App\Models\User;
use App\Services\liff\invite\InviteeIncentiveUserService;
use App\Services\liff\invite\InviteIncentiveUserService;
use Illuminate\Http\Request;

class InviteeIncentiveUserController extends Controller
{
    private $service;

    public function __construct(InviteeIncentiveUserService $service)
    {
        $this->service = $service;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $invitee_incentive_users = $this->service->index($user);
        return response()->json(['invitee_incentives' => $invitee_incentive_users], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  @param  \Illuminate\Http\Request  $request
     * @param  User  $user
     * @param  InviteeIncentiveUser  $invitee_incentive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user, InviteeIncentiveUser $invitee_incentive)
    {
        $invitee_incentive = $this->service->update($request, $invitee_incentive);
        return response()->json(['invitee_incentive' => $invitee_incentive], 200);
    }
}
