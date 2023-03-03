<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Models\InvitationUser;

class InvitationUserService
{

    public function getInvitationUsersById(Invitation $invitation) 
    {
        return InvitationUser::with('user')->where('invitation_id', $invitation->id)->get();
    }
}
