<?php
namespace App\Services\api\line\invite;

use App\Models\DefaultInviteIncentive;
use App\Models\User;
use LINE\LINEBot;

class InviteService 
{
    private $user;
    private $bot;
    private $passphrase;

    public function __construct(LINEBot $bot, User $user) {
        $this->bot = $bot;
        $this->user = $user;
        $this->passphrase = config('passphrase.ENCRYPT_PASSPHRASE');
    }

    public function createTextMessage()
    {
        $display_name = $this->bot->getProfile($this->user->line_id)->getJSONDecodedBody()['displayName'];
        $text = "$display_name さんから招待コードが届きました！友達登録し、アンケートを回答するとスペシャルクーポンが発行されます！\n\n";
        
        $default_invite_incentive = DefaultInviteIncentive::find(1);
        $encrypt_date = $this->encryptText(date("Y-m-d H:i:s"));
        $encrypt_version_key = $this->encryptText($default_invite_incentive->version_key);
        $encrypt_user_id = $this->encryptText($this->user->id);
        $url = "https://liff.line.me/1660723896-RmovvEYY?path=friends/add/$encrypt_user_id/$encrypt_version_key/$encrypt_date";
        
        return [
            'message' => [
                'type' => 'text',
                'text' => $text .$url
            ],
            'url' => $url
        ];
    }

    private function encryptText($data)
    {
        $iv = openssl_random_pseudo_bytes(16);
        return str_replace(array('+', '/', '='), array('_', '-', '.'), openssl_encrypt($data, 'aes-128-cbc', $this->passphrase, 0, $iv));
    }
}