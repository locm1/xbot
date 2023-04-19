<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\InviteIncentive;
use App\Services\liff\invite\InviterIncentiveService;

class InviterIncentiveController extends Controller
{
    private $service;

    public function __construct(InviterIncentiveService $service)
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
        $inviter_incentive_users = $this->service->index($invite_incentive);
        return response()->json(['inviter_incentive_users' => $inviter_incentive_users], 200);
    }
}
