<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Models\InviterIncentiveUser;
use App\Models\User;
use App\Services\liff\invite\InviteIncentiveUserService;
use App\Services\liff\invite\InviterIncentiveUserService;
use Illuminate\Http\Request;

class InviterIncentiveUserController extends Controller
{
    private $service;

    public function __construct(InviterIncentiveUserService $service)
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
        $inviter_incentives = $this->service->index($user);
        return response()->json(['inviter_incentives' => $inviter_incentives], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  @param  \Illuminate\Http\Request  $request
     * @param  User  $user
     * @param  InviterIncentiveUser  $inviter_incentive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user, InviterIncentiveUser $inviter_incentive)
    {
        $inviter_incentive = $this->service->update($request, $inviter_incentive);
        return response()->json(['inviter_incentive' => $inviter_incentive], 200);
    }
}
