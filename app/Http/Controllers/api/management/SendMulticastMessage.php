<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\api\line\CreateMessageByTypeService;
use Illuminate\Http\Request;
use LINE\LINEBot as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;

class SendMulticastMessage extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $messages = Message::find($request->templateId)->messageItems()->get();
        $create_message = new CreateMessageByTypeService($bot, $messages);
        $multi_message_builder = new MultiMessageBuilder();
        $bot->multicast($request->user_ids, $create_message($multi_message_builder));
    }
}
