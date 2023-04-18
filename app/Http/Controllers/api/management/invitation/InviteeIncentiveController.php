<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\InviteIncentive;
use App\Models\User;
use App\Services\liff\invite\InviteeIncentiveService;

class InviteeIncentiveController extends Controller
{
    private $service;

    public function __construct(InviteeIncentiveService $service)
    {
        $this->service = $service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  InviteIncentive  $invite_incentive
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $invitee_incentive_users = $this->service->index($user);
        return response()->json(['invitee_incentive_users' => $invitee_incentive_users], 200);
    }
}
