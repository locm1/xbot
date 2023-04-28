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
use LINE\LINEBot\MessageBuilder\TemplateBuilder\CarouselColumnTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateBuilder\CarouselTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateBuilder\ImageCarouselColumnTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateBuilder\ImageCarouselTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateMessageBuilder;
use LINE\LINEBot\MessageBuilder\TextMessageBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

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
            $column_builder = null;
            $action_builder = null;
            switch ($message->type) {
                case 1:
                    $text_message_builder_action = new TextMessageBuilderAction($this->bot, $this->user_id);
                    $message_builder = $text_message_builder_action->createTextMessage($message->text);
                    break;
                case 2:
                    $image_url = $url .$message->image_path;
                    Log::debug($image_url);
                    $message_builder = new ImageMessageBuilder($image_url, $image_url);
                    break;
                case 3:
                    $video_url = $url .$message->video_path;
                    $message_builder = new VideoMessageBuilder($video_url, $video_url);
                    break;
                case 4:
                    $carousel_images = $message->carouselImages;
                    foreach ($carousel_images as $k => $v) {
                        $action_builder = new UriTemplateActionBuilder($v->label, $v->uri);
                        $column_builder[] = new ImageCarouselColumnTemplateBuilder("https://satonoca-web.com/wp-content/uploads/2020/09/1.414-1-300-212.png", $action_builder);
                    }
                    $carousel_builder = new ImageCarouselTemplateBuilder($column_builder);
                    $message_builder = new TemplateMessageBuilder('新着メッセージがあります', $carousel_builder);
                    break;
                case 5:
                    $carousel_products = $message->carouselProducts;
                    foreach ($carousel_products as $k => $v) {
                        $action_builder = null;
                        $action_builder[] = new UriTemplateActionBuilder($v->label, $v->uri);
                        $column_builder[] = new CarouselColumnTemplateBuilder($v->title, $v->text, "https://satonoca-web.com/wp-content/uploads/2020/09/1.414-1-300-212.png", $action_builder);
                    }
                    $carousel_builder = new CarouselTemplateBuilder($column_builder);
                    $message_builder = new TemplateMessageBuilder('新着メッセージがあります', $carousel_builder);
                    break;
            }
            $multi_message_builder->add($message_builder);
        }
        return $multi_message_builder;
    }
}