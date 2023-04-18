<?php
namespace App\Services\api\line\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\User;
use App\Services\common\CreateLineBotUtility;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class InviteService 
{
    private $bot;

    public function __construct() {
        $this->bot = (new CreateLineBotUtility)();
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

    public function sendInviteMessage(string $line_id)
    {
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