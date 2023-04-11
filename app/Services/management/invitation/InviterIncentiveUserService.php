<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentive;
use App\Models\InviterIncentiveUser;
use PhpParser\Node\Expr\Cast\String_;

class InviterIncentiveUserService
{

    public function index(InviteIncentive $invite_incentive) 
    {
        return InviterIncentiveUser::where('invite_incentive_id', $invite_incentive->id)
            ->where('is_issued', 1)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }

    public function store(InviteIncentive $invite_incentive, InviteeUser $invitee_user)
    {
        $data = [
            'invite_incentive_id' => $invite_incentive->id, 
            'user_id' => $invitee_user->inviter_user_id,
            'is_issued' => $invite_incentive->inviter_timing == 1 ? 1 : 0, 
            'usage_status' => 0, 
            'issued_at' => $invitee_user->issued_at
        ];
        return InviterIncentiveUser::create($data);
    }
}
