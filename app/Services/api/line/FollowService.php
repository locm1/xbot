<?php
namespace App\Services\api\line;

use App\Models\InflowRouteUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviteHistory;
use App\Models\InviteIncentive;
use App\Models\InviteIncentiveJob;
use App\Models\InviterIncentiveUser;
use App\Models\User;
use App\Services\management\invitation\InviteeIncentiveUserService;
use App\Services\management\invitation\InviterIncentiveUserService;
use App\Services\management\invite_history\InviteHistoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;

use function PHPUnit\Framework\throwException;

class FollowService 
{
    protected $line_id;
    protected $bot;

    public function __construct(LINEBot $bot, string $line_id) {
        $this->line_id = $line_id;
        $this->bot = $bot;
    }

    public function userExists(): bool
    {
        return User::where('line_id', $this->line_id)->first() ? true : false;
    }

    public function upsertUser()
    {
        $response = $this->bot->getProfile($this->line_id);
        if ($response->isSucceeded()) {
            $profile = $response->getJSONDecodedBody();
            $display_name = $profile['displayName'];
            $picture_url = $profile['pictureUrl'] ?? null;
            $status_message = $profile['statusMessage'] ?? null;
            User::upsert([
                'nickname' => $display_name, 'img_path' => $picture_url, 'line_id' => $this->line_id, 
                'is_blocked' => 0, 'status_message' => $status_message, 'is_registered' => 0
            ], ['line_id']);
            $User = User::where('line_id', $this->line_id)->first();
            return $User;
        } else {
            Log::debug('Failed to get profile. HTTP status code: ' . $response->getHTTPStatus() . ', response body: ' . $response->getRawBody());
            return $response->getHTTPStatus();
        }
    }

    public function checkInflowRoute(User $User)
    {
        $five_minute_before = date("Y-m-d H:i:s",strtotime("-5 minute"));
        $now = date('Y-m-d H:i:s');
        $term = [$five_minute_before, $now];
        $InflowRouteUser = InflowRouteUser::where('line_id', $this->line_id)->whereBetween('created_at', $term)->first();
        $update_count = 0;
        if ($InflowRouteUser) $update_count = $InflowRouteUser->update(['user_id' => $User->id]);

        return $update_count;
    }

    public function create(InviteIncentiveJob $InviteIncentiveJob)
    {
        return DB::transaction(function () use ($InviteIncentiveJob, $User) {
            $invite_incentive = InviteIncentive::where('version_key', $InviteIncentiveJob->version_key)->latest('id')->first();

            $invite_history_service = new InviteHistoryService();
            $inviter_incentive_user_service = new InviterIncentiveUserService();
            $invitee_incentive_user_service = new InviteeIncentiveUserService();

            # 紹介者テーブルのインサート
            $inviter_incentive_data = [
                'invite_incentive_id' => $invite_incentive->id, 
                'user_id' => $InviteIncentiveJob->inviter_user_id,
                'is_issued' => $invite_incentive->inviter_timing == 1 ? 1 : 0, 
                'usage_status' => 1, 
                'issued_at' => $InviteIncentiveJob->invited_at
            ];
            $inviter_incentive_user = $inviter_incentive_user_service->store($inviter_incentive_data);

            # 招待者テーブルのインサート
            $invitee_incentive_data = [
                'invite_incentive_id' => $invite_incentive->id, 
                'user_id' => $User->id,
                'inviter_incentive_user_id' => $inviter_incentive_user->id,
                'is_issued' => $invite_incentive->invitee_timing == 1 ? 1 : 0, 
                'usage_status' => 1, 
                'issued_at' => $InviteIncentiveJob->invited_at
            ];
            $invitee_incentive_user = $invitee_incentive_user_service->store($invitee_incentive_data);

            # 招待履歴のインサート
            $invite_history_service->store($User, $InviteIncentiveJob->inviter_user_id);
            return array($inviter_incentive_user, $invitee_incentive_user);
        });
        
    }

    public function unblock(): User
    {
        $User = User::where('line_id', $this->line_id)->first();
        $User->update(['block_date' => null, 'is_blocked' => 0]);

        return $User;
    }
}