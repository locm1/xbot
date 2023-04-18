<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Models\InviterIncentive;
use App\Models\User;
use App\Services\liff\invite\InviterIncentiveService;
use Illuminate\Http\Request;

class InviterIncentiveController extends Controller
{
    private $service;

    public function __construct(InviterIncentiveService $service)
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
     * @param  InviterIncentive  $inviter_incentive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user, InviterIncentive $inviter_incentive)
    {
        $inviter_incentive = $this->service->update($inviter_incentive);
        return response()->json(['inviter_incentive' => $inviter_incentive], 200);
    }
}
