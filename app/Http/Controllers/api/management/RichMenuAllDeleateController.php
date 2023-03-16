<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\LineBotService as LINEBot;

class RichMenuAllDeleateController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);

        //リッチメニュー全削除
        $response = $bot->getRichMenuList()->getJSONDecodedBody();
        foreach ($response['richmenus'] as $richmenu) {
            $richmenu_ids[] = $richmenu['richMenuId'];
        }
        foreach ($richmenu_ids as $k => $id) {
            $bot->deleteRichMenu($id)->getJSONDecodedBody();
        }

        //リッチメニューエイリアス全削除
        $aliases = $bot->getRichMenuAliasList()->getJSONDecodedBody()['aliases'];
        foreach ($aliases as $k => $v) {
            $alias_ids[] = $v['richMenuAliasId'];
        }
        foreach ($alias_ids as $k => $id) {
            $bot->deleteRichMenuAlias($id)->getJSONDecodedBody();
        }

        return 'success';
    }
}
