<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\InviteIncentive;
use App\Services\management\invitation\InviteeIncentiveUserService;

class InviteeIncentiveUserController extends Controller
{
    private $service;

    public function __construct(InviteeIncentiveUserService $service)
    {
        $this->service = $service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  InviteIncentive  $invite_incentive
     * @return \Illuminate\Http\Response
     */
    public function __invoke(InviteIncentive $invite_incentive)
    {
        $invitee_incentive_users = $this->service->index($invite_incentive);
        return response()->json(['invitee_incentive_users' => $invitee_incentive_users], 200);
    }
}
