<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\LineBotService as LINEBot;

class RichMenuSetDefaultController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        //デフォルトのリッチメニューに登録する
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $bot->setDefaultRichMenuId($id)->getJSONDecodedBody();
        return $id;
    }
}
