<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentive;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentive;
use App\Models\InviterIncentiveUser;

class InviteeIncentiveService
{
    public function index(InviteIncentive $invite_incentive) 
    {
        return InviteeIncentive::where('user_id', $invite_incentive->id)
            ->where('is_issued', 1)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }

    public function store(array $data)
    {
        return InviteeIncentiveUser::create($data);
    }

    public function update(InviteeIncentive $invitee_incentive)
    {
        $data = ['is_used' => 1, 'used_at' => date('Y-m-d H:i:s')];
        return $invitee_incentive->update($data);
    }
}
