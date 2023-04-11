<?php

namespace App\Services\management\invite_history;

use App\Models\InviteHistory;
use App\Models\User;
use App\Services\management\AbstractManagementService;

class InviteHistoryService
{

    public function index() 
    {
        //
    }


    public function store(User $user, String $inviter_user_id) 
    {
        $data = [
            'inviter_user_id' => $inviter_user_id, 'invitee_user_id' => $user->id
        ];
        return InviteHistory::create($data);
    }

}
