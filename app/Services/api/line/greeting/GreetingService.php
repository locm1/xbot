<?php
namespace App\Services\api\line\greeting;

use App\Models\GreetingMessage;
use LINE\LINEBot;
use LINE\LINEBot\MessageBuilder\ImageMessageBuilder;
use LINE\LINEBot\MessageBuilder\VideoMessageBuilder;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;

class GreetingService 
{
    protected $user_id;
    protected $bot;
    private $url;

    public function __construct(LINEBot $bot, string $user_id) {
        $this->user_id = $user_id;
        $this->bot = $bot;
        $this->url = 'https://8951-2400-2413-9641-0-7de2-2567-fdaf-1d81.jp.ngrok.io';
    }

    public function sendGreetingMessage()
    {
        $multi_message_builder = new MultiMessageBuilder();
        $messages = GreetingMessage::all();

        foreach ($messages as $message) {
            switch ($message->type) {
                case 1:
                    $text_message_builder_action = new TextMessageBuilderAction($this->bot, $this->user_id);
                    $message_builder = $text_message_builder_action->createTextMessage($message->text);
                    break;
                case 2:
                    $image_url = $this->url .$message->image_path;
                    $message_builder = new ImageMessageBuilder($image_url, $image_url);
                    break;
                case 3:
                    $video_url = $this->url .$message->video_path;
                    $video_preview_url = $this->url .'/storage/greeting/drink_cola_zero_petbottle.png';
                    $message_builder = new VideoMessageBuilder($video_url, $video_url);
                    break;
            }
            $multi_message_builder->add($message_builder);
        }
        
        # プッシュメッセージを送信
        $response = $this->bot->pushMessage($this->user_id, $multi_message_builder);
    }
}