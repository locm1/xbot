<?php
namespace App\Services\liff\invite;

use App\Models\InviteeIncentive;
use App\Models\User;

class InviteeIncentiveService 
{
    public function index(User $user)
    {
        $InviteIncentives = InviteeIncentive::where('user_id', $user->id)
            ->with('inviteIncentive')
            ->where('is_used', 0)->get();
        $data = null;
        foreach ($InviteIncentives as $k => $InviteIncentive) {
            $data[] = [
                'id' => $InviteIncentive->id,
                'invite_incentive' => [
                    'id' => $InviteIncentive->inviteIncentive->id,
                    'invitee_content' => $InviteIncentive->inviteIncentive->invitee_content,
                    'invitee_title' => $InviteIncentive->inviteIncentive->invitee_title,
                ]
            ];
        }
        
        return $data;
    }

    public function update($invitee_incentive)
    {
        $data = ['is_used' => 1, 'used_at' => date('Y-m-d H:i:s')];
        return $invitee_incentive->update($data);
    }
}