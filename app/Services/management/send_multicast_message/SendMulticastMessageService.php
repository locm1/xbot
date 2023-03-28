<?php

namespace App\Services\management\send_multicast_message;

use App\Models\Message;
use App\Models\SendMessage;
use App\Models\SendMessageJob;
use App\Models\SendMessageJobUser;
use App\Models\SendMessageUser;
use LINE\LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\line\CreateMessageByTypeService;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;
use LINE\LINEBot\Response;

class SendMulticastMessageService
{
    private $bot;

    public function __construct() {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $this->bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
    }
    
    public function insert($template_id, $user_ids, int $status, $search_json)
    {
        $send_message_data = [
            'message_id' => $template_id,
            'status' => $status,
            'search_json' => json_encode($search_json),
        ];
        $SendMessage = SendMessage::create($send_message_data);
        $save_user_ids = [];
        foreach ($user_ids as $k => $v) {
            $save_user_ids[] = [
                'user_id' => $v,
                'send_message_id' => $SendMessage->id,
            ];
        }
        SendMessageUser::upsert($save_user_ids, 'id');
        return $SendMessage->id;
    }

    public function send($template_id, $user_line_ids): Response
    {
        $messages = Message::find($template_id)->messageItems()->get();
        $create_message = new CreateMessageByTypeService($this->bot, $messages);
        $multi_message_builder = new MultiMessageBuilder();
        $response = $this->bot->multicast($user_line_ids, $create_message($multi_message_builder));
        return $response;
    }

    public function reserve($send_datetime, $send_message_id) 
    {
        $send_message_job_data = [
            'send_message_id' => $send_message_id,
            'reservation_at' => $send_datetime,
        ];
        $SendMessageJob = SendMessageJob::create($send_message_job_data);
        return $SendMessageJob->id ? true : false;
    }
}
