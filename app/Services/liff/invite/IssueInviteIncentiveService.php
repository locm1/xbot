<?php
namespace App\Services\liff\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviterIncentiveUser;
use App\Models\User;
use App\Services\api\line\invite\InviteService;
use App\Services\common\CreateLineBotUtility;
use App\Services\management\invitation\InviteeIncentiveUserService;
use App\Services\management\invitation\InviterIncentiveUserService;

class IssueInviteIncentiveService 
{
    private $user;
    private $invite_service;
    private $timing;

    public function __construct(User $user, int $timing)
    {
        $bot = new CreateLineBotUtility;
        $this->user = $user;
        $this->timing = $timing;
        $this->invite_service = new InviteService($bot(), $this->user);
    }

    public function issueInviterIncentive(): array
    {
        $inviter_incentive_user = InviterIncentiveUser::where('user_id', $this->user->id);
        $invite_incentive = DefaultInviteIncentive::find(1)->inviteIncentive;

        if ($inviter_incentive_user->exists() && $invite_incentive->inviter_timing == $this->timing) {
            # 発行済みにアップデート
            $inviter_incentive_user_service = new InviterIncentiveUserService();
            # 紹介者テーブルのインサート
            $data = [
                'invite_incentive_id' => $invite_incentive->id, 
                'user_id' => $this->user->id,
                'is_issued' => 1, 
                'usage_status' => 1, 
                'issued_at' => date('Y-m-d H:i:s')
            ];
            $store_inviter_incentive_user = $inviter_incentive_user_service->store($data);

            # プッシュメッセージ
            $this->invite_service->sendInviteMessage($store_inviter_incentive_user->is_issued, 'inviter', $this->timing);

            return [
                'status' => 'ok',
                'message' => 'It was the timing to issue incentives'
            ];
        }

        return [
            'status' => 'ng',
            'message' => 'It was not the timing to issue incentives'
        ];
    }

    
    public function issueInviteeIncentive(): array
    {
        $invitee_incentive_user = InviteeIncentiveUser::where('user_id', $this->user->id);
        $invite_incentive = DefaultInviteIncentive::find(1)->inviteIncentive;

        if ($invitee_incentive_user->exists() && $invite_incentive->invitee_timing == $this->timing) {
            # 発行済みにアップデート
            $invitee_incentive_user_service = new InviteeIncentiveUserService();
            $data = [
                'invite_incentive_id' => $invite_incentive->id, 
                'user_id' => $this->user->id,
                'inviter_incentive_user_id' => $invitee_incentive_user->first()->inviter_incentive_user_id,
                'is_issued' => 1, 
                'usage_status' => 1, 
                'issued_at' => date('Y-m-d H:i:s')
            ];
            $store_invitee_incentive_user = $invitee_incentive_user_service->store($data);

            # プッシュメッセージ
            $this->invite_service->sendInviteMessage($store_invitee_incentive_user->is_issued, 'invitee', $this->timing);

            return [
                'status' => 'ok',
                'message' => 'It was the timing to issue incentives'
            ];
        }

        return [
            'status' => 'ng',
            'message' => 'It was not the timing to issue incentives'
        ];
    }
}