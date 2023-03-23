<?php
namespace App\Services\api\line\greeting;

use App\Models\GreetingMessage;
use App\Services\management\greeting\GreetingMessageWithQuestionnaireService;
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
        $this->url = secure_url('');
    }

    public function sendGreetingMessage()
    {
        $greeting_messages_with_questionnaire_serivce = new GreetingMessageWithQuestionnaireService();
        $greeting_messages_with_questionnaires = $greeting_messages_with_questionnaire_serivce->index();

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

        # アンケート回答ボタンをつけた場合、Flexメッセージ作成
        if ($greeting_messages_with_questionnaires->is_questionnaire ?? false == 1) {
            $flex_message_builder_action = new FlexMessageBuilderAction();
            $message_builder = $flex_message_builder_action->createFlexMessage();
            $multi_message_builder->add($message_builder);
        }
        
        # プッシュメッセージを送信
        return $this->bot->pushMessage($this->user_id, $multi_message_builder)->getJSONDecodedBody();
    }
}