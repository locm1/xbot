<?php
namespace App\Services\api\line\greeting;

use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class TextMessageBuilderAction 
{
    private $user_id;
    private $bot;

    public function __construct(LINEBot $bot, string $user_id = null) {
        $this->user_id = $user_id;
        $this->bot = $bot;
    }

    public function createTextMessage($text): TextMessageBuilder
    {
        if ($this->user_id) { 
            $profile = $this->bot->getProfile($this->user_id);
            $bot_info = $this->bot->getBotInfo();
            $user_name = $this->getDisplayName($profile);
            $bot_name = $this->getDisplayName($bot_info);
            $replace_text = $this->replaceText($user_name, $bot_name, $text);
        }
        $message_builder = new TextMessageBuilder($replace_text ?? $text);
        return $message_builder;
    }

    private function getDisplayName($response)
    {
        $profile = $response->getJSONDecodedBody();
        return $profile['displayName'];
    }

    private function replaceText($user_name, $bot_name, $text)
    {
        $replaces = array(
            '%friend_name%' => $user_name,
            '%account_name%' => $bot_name
        );
        $search = array_keys($replaces);
        $replace = array_values($replaces);
        return str_replace($search, $replace, $text);
    }
}