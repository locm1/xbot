<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentive;
use App\Models\InviterIncentiveUser;

class InviteeIncentiveUserService
{
    public function index(InviteIncentive $invite_incentive) 
    {
        return InviteeIncentiveUser::where('invite_incentive_id', $invite_incentive->id)
            ->where('is_issued', 1)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }

    public function store(InviteIncentive $invite_incentive, String $user_id, String $inviter_incentive_user_id, $issued_at)
    {
        $data = [
            'invite_incentive_id' => $invite_incentive->id, 
            'user_id' => $user_id,
            'inviter_incentive_user_id' => $inviter_incentive_user_id,
            'is_issued' => $invite_incentive->invitee_timing == 1 ? 1 : 0, 
            'usage_status' => 0, 
            'issued_at' => $issued_at
        ];
        return InviteeIncentiveUser::create($data);
    }
}
