<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteIncentive;
use App\Models\InviterIncentiveUser;

class InviteIncentiveUserService
{

    public function getInviterIncentiveUsersById(InviteIncentive $invite_incentive) 
    {
        return InviterIncentiveUser::where('invite_incentive_id', $invite_incentive->id)
            ->where('is_issued', 1)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }

    public function getInviteeIncentiveUsersById(InviteIncentive $invite_incentive) 
    {
        return InviteeIncentiveUser::where('invite_incentive_id', $invite_incentive->id)
            ->where('is_issued', 1)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }
}
