<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\api\LineBotService as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;

class LineWebhookController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $request->all();
        $events = $data['events'];

        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);

        foreach ($events as $event) {
            $response = $bot->replyText($event['replyToken'], $event['message']['text']);
        }
        return;
    }
}
