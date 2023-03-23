<?php
namespace App\Services\api\line;

use App\Models\User;
use App\Services\api\line\greeting\TextMessageBuilderAction;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder;
use LINE\LINEBot\MessageBuilder\ImageMessageBuilder;
use LINE\LINEBot\MessageBuilder\VideoMessageBuilder;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;

class CreateMessageByTypeService 
{
    protected $bot;
    protected $messages;
    protected $user_id;

    public function __construct(LINEBot $bot, $messages, string $user_id = null) {
        $this->bot = $bot;
        $this->messages = $messages;
        $this->user_id = $user_id;
    }

    public function __invoke(MultiMessageBuilder $multi_message_builder): MultiMessageBuilder
    {
        $url = secure_url('');
        foreach ($this->messages as $message) {
            switch ($message->type) {
                case 1:
                    $text_message_builder_action = new TextMessageBuilderAction($this->bot, $this->user_id);
                    $message_builder = $text_message_builder_action->createTextMessage($message->text);
                    break;
                case 2:
                    $image_url = $url .$message->image_path;
                    $message_builder = new ImageMessageBuilder($image_url, $image_url);
                    break;
                case 3:
                    $video_url = $url .$message->video_path;
                    $message_builder = new VideoMessageBuilder($video_url, $video_url);
                    break;
            }
            $multi_message_builder->add($message_builder);
        }
        return $multi_message_builder;
    }
}