<?php
namespace App\Services\api\line\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\User;
use App\Services\common\CreateLineBotUtility;
use App\Services\liff\invite\InviteIncentiveJobService;
use App\Services\management\invitation\InviteeIncentiveService;
use App\Services\management\invitation\InviterIncentiveService;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class InviteService 
{
    private $bot;

    public function __construct() {
        $this->bot = (new CreateLineBotUtility)();
    }

    /**
     * invokeで実行した場合、該当のユーザーに対してのインセンティブジョブ
     * があるか確認し、該当のジョブがある且つタイミングが一致した場合
     * インセンティブ発行処理を行う
     * $idはline_id、user_idのどちらでも可
     */
    public function __invoke(int|string $id, int $timing): bool
    {
        $invite_incentive_job_service = new InviteIncentiveJobService;
        $type = gettype($id);
        if ($type === "int") {
            $user_id = $id;
            $InviteIncentiveJob = $invite_incentive_job_service->findByUserId($id);
        } else if ($type === "string") {
            $user_id = User::where('line_id', $id)->first()->id;
            $InviteIncentiveJob = $invite_incentive_job_service->findByLineId($id);
            if ($InviteIncentiveJob) $InviteIncentiveJob->update(['invitee_user_id' => $user_id]);
        }
        if (!$InviteIncentiveJob) return false;
        if ($InviteIncentiveJob->inviteIncentive->invitee_timing === $timing) {
            $invitee_incentive_service = new InviteeIncentiveService;
            $invitee_incentive_service->issue($InviteIncentiveJob);
            $this->sendInviteMessage($user_id);
        }
        if ($InviteIncentiveJob->inviteIncentive->inviter_timing === $timing) {
            $invitee_incentive_service = new InviterIncentiveService;
            $invitee_incentive_service->issue($InviteIncentiveJob);
            $this->sendInviteMessage($InviteIncentiveJob->inviter_user_id);
        }
        return true;
    }

    public function getUri(User $User): string
    {
        $invite_incentive_id = DefaultInviteIncentive::find(1)->invite_incentive_id;
        $encrypt_invite_incentive_id = $this->encryptData($invite_incentive_id);
        $encrypt_user_id = $this->encryptData($User->id);
        return "https://liff.line.me/1660723896-RmovvEYY?path=friends/add/$encrypt_user_id/$encrypt_invite_incentive_id";
    }

    public function getMessage(string $line_id, string $uri): string
    {
        $display_name = $this->bot->getProfile($line_id)->getJSONDecodedBody()['displayName'];
        $message = "$display_name さんから招待コードが届きました！友達登録し、アンケートを回答するとスペシャルクーポンが発行されます！\n\n$uri";
        
        return $message;
    }

    public function sendInviteMessage(int $user_id)
    {
        $line_id = User::find($user_id)->line_id;
        $text_message =  "招待専用クーポンが発行されました。\nメニューの「紹介」からクーポンをご確認いただけます。";
        $message_builder = new TextMessageBuilder($text_message);
        return $this->bot->pushMessage($line_id, $message_builder)->getJSONDecodedBody();
    }

    private function encryptData($data)
    {
        $encrypted = openssl_encrypt($data, 'AES-128-ECB', config('passphrase'));
        $replaced = str_replace(array('=', '/', '+'), array('_', '-', '.'), $encrypted);
        return $replaced;
    }
}