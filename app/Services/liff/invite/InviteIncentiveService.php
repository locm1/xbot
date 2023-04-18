<?php
namespace App\Services\liff\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\InviteeIncentive;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteIncentiveJob;
use App\Models\InviterIncentiveUser;
use App\Models\User;
use App\Services\api\line\invite\InviteService;
use App\Services\common\CreateLineBotUtility;
use App\Services\management\invitation\InviteeIncentiveUserService;
use App\Services\management\invitation\InviterIncentiveUserService;

class InviteIncentiveService 
{
    private $InviteIncentiveJob;

    public function issue(User $User, int $timing): InviteeIncentiveUser
    {
        if ($this->jobExists($User->id, $timing)) {
            $data = ['invite_incentive_job_id' => $this->InviteIncentiveJob->id];
            $InviteeIncentiveUser = InviteeIncentiveUser::create($data);

            $invite_service = new InviteService();
            $invite_service->sendInviteMessage($User->line_id);

            return $InviteeIncentiveUser;
        }

        return null;
    }

    private function jobExists(int $invitee_user_id, int $timing): bool
    {
        $invitee_incentive_user = InviteIncentiveJob::where('invitee_user_id', $invitee_user_id)->first();
        $this->InviteIncentiveJob = InviteIncentiveJob::with('inviteInsentive')->get();

        return $invitee_incentive_user && $this->InviteIncentiveJob->invitee_timing == $timing;
    }
}