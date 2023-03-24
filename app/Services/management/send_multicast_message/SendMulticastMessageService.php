<?php

namespace App\Services\management\send_multicast_message;

use App\Models\Message;
use App\Models\SendMessageJob;
use App\Models\SendMessageJobUser;
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
    public function send($template_id, $user_line_ids): Response
    {
        $messages = Message::find($template_id)->messageItems()->get();
        $create_message = new CreateMessageByTypeService($this->bot, $messages);
        $multi_message_builder = new MultiMessageBuilder();
        $response = $this->bot->multicast($user_line_ids, $create_message($multi_message_builder));
        return $response;
    }

    public function reserve($template_id, $user_line_ids, $send_datetime) 
    {
        $message_data = [
            'message_id' => $template_id,
            'reservation_datetime' => $send_datetime,
        ];
        $SendMessageJob = SendMessageJob::create($message_data);
        $line_ids = [];
        foreach ($user_line_ids as $k => $v) {
            $line_ids[] = [
                'line_id' => $v,
                'send_message_job_id' => $SendMessageJob->id,
            ];
        }
        SendMessageJobUser::upsert($line_ids, 'id');

        return $SendMessageJob->id ? true : false;
    }
}
