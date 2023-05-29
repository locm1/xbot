<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentive;
use App\Models\InviteIncentiveJob;
use App\Models\InviterIncentive;
use App\Models\InviterIncentiveUser;
use PhpParser\Node\Expr\Cast\String_;

class InviterIncentiveService
{

    public function index(InviteIncentive $invite_incentive) 
    {
        return InviterIncentive::where('invite_incentive_id', $invite_incentive->id)
            ->with(['user', 'inviteIncentive'])
            ->get();
    }

    public function store(array $data)
    {
        return InviterIncentive::create($data);
    }

    public function update($inviter_incentive_user)
    {
        $data = ['is_issued' => 1, 'issued_at' => date('Y-m-d H:i:s')];
        $inviter_incentive_user->update($data);
    }

    public function issue(InviteIncentiveJob $InviteIncentiveJob): InviterIncentive
    {
        $data = [
            'invite_incentive_id' => $InviteIncentiveJob->invite_incentive_id,
            'user_id' => $InviteIncentiveJob->inviter_user_id,
            'invite_incentive_job_id' => $InviteIncentiveJob->id
        ];
        return $this->store($data);
    }
}
