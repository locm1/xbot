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

    public function store(array $data)
    {
        return InviterIncentiveUser::create($data);
    }

    public function update($inviter_incentive_user)
    {
        $data = ['is_issued' => 1, 'issued_at' => date('Y-m-d H:i:s')];
        $inviter_incentive_user->update($data);
    }
}
