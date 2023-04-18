<?php
namespace App\Services\liff\invite;

use App\Models\InviterIncentive;
use App\Models\User;

class InviterIncentiveService 
{
    public function index(User $user)
    {
        $InviteIncentives = InviterIncentive::where('user_id', $user->id)
            ->with('inviteIncentive')
            ->where('is_used', 0)->get();
            $data = null;
            foreach ($InviteIncentives as $k => $InviteIncentive) {
                $data[] = [
                    'id' => $InviteIncentive->id,
                    'invite_incentive' => [
                        'id' => $InviteIncentive->inviteIncentive->id,
                        'inviter_content' => $InviteIncentive->inviteIncentive->inviter_content,
                        'inviter_title' => $InviteIncentive->inviteIncentive->inviter_title,
                    ]
                ];
            }
        
            return $data;
    }

    public function update(InviterIncentive $inviter_incentive)
    {
        $data = ['is_used' => 1, 'used_at' => date('Y-m-d H:i:s')];
        return $inviter_incentive->update($data);
    }
}