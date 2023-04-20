<?php

namespace App\Services\management\invitation;

use App\Models\InviteeIncentive;
use App\Models\InviteIncentive;
use App\Models\InviteIncentiveJob;

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
        return InviteeIncentive::create($data);
    }

    public function update(InviteeIncentive $invitee_incentive)
    {
        $data = ['is_used' => 1, 'used_at' => date('Y-m-d H:i:s')];
        return $invitee_incentive->update($data);
    }

    public function issue(InviteIncentiveJob $InviteIncentiveJob): InviteeIncentive
    {
        $data = [
            'invite_incentive_id' => $InviteIncentiveJob->invite_incentive_id,
            'user_id' => $InviteIncentiveJob->invitee_user_id,
            'invite_incentive_job_id' => $InviteIncentiveJob->id
        ];
        return $this->store($data);
    }
}
