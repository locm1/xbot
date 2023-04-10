<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\InviteIncentive;
use App\Services\management\invitation\InviteIncentiveUserService;

class InviterIncentiveUserController extends Controller
{
    private $invite_incentive_user_service;

    public function __construct(InviteIncentiveUserService $invite_incentive_user_service)
    {
        $this->invite_incentive_user_service = $invite_incentive_user_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  InviteIncentive  $invite_incentive
     * @return \Illuminate\Http\Response
     */
    public function __invoke(InviteIncentive $invite_incentive)
    {
        $inviter_incentive_users = $this->invite_incentive_user_service->getInviterIncentiveUsersById($invite_incentive);
        return response()->json(['inviter_incentive_users' => $inviter_incentive_users], 200);
    }
}
