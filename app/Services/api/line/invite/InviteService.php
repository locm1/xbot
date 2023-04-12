<?php
namespace App\Services\api\line\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class InviteService 
{
    private $user;
    private $bot;
    private $passphrase;

    public function __construct(LINEBot $bot, User $user) {
        $this->bot = $bot;
        $this->user = $user;
        $this->passphrase = config('api_key.COMMON_PASSWORD');
    }

    public function createTextMessage()
    {
        $display_name = $this->bot->getProfile($this->user->line_id)->getJSONDecodedBody()['displayName'];
        $text = "$display_name さんから招待コードが届きました！友達登録し、アンケートを回答するとスペシャルクーポンが発行されます！\n\n";
        
        $default_invite_incentive = DefaultInviteIncentive::find(1)->inviteIncentive;
        $encrypt_date = $this->encryptData(date("Y-m-d H:i:s"));
        $encrypt_version_key = $this->encryptData($default_invite_incentive->version_key);
        $encrypt_user_id = $this->encryptData($this->user->id);
        $url = "https://liff.line.me/1660723896-RmovvEYY?path=friends/add/$encrypt_user_id/$encrypt_version_key/$encrypt_date";
        
        return [
            'message' => [
                'type' => 'text',
                'text' => $text .$url
            ],
            'url' => $url
        ];
    }

    public function sendInviteMessage($inviter_incentive_user, $invitee_incentive_user)
    {
        // if ($inviter_incentive_user->is_issued == 1) {
        //     $text_message = "友達登録ありがとうございます。\n紹介専用クーポンが発行されました。\nメニューの「紹介」からクーポンをご確認いただけます。";
        //     // $message_builder = new TextMessageBuilder($text_message);
        //     // $this->bot->replyMessage($reply_token, $message_builder)->getJSONDecodedBody();
        // }

        if ($invitee_incentive_user->is_issued == 1) {
            $text_message = "友達登録ありがとうございます。\n招待専用クーポンが発行されました。\nメニューの「紹介」からクーポンをご確認いただけます。";
            Log::debug($text_message);
            $message_builder = new TextMessageBuilder($text_message);
            return $this->bot->pushMessage($this->user->line_id, $message_builder)->getJSONDecodedBody();
        }
    }

    private function encryptData($data)
    {
        $iv = openssl_random_pseudo_bytes(16);
        $iv = str_pad($iv, 16, "\0");
        $encrypted = openssl_encrypt($data, 'aes-128-cbc', $this->passphrase, OPENSSL_RAW_DATA, $iv);
        return rtrim(strtr(base64_encode($encrypted . '::' . $iv), '+/', '-_'), '=');
    }
}