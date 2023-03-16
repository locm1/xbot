<?php

namespace App\Services\management\rich_menu_ailias;

use App\Services\management\AbstractManagementService;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot\RichMenuBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuSizeBuilder;
use LINE\LINEBot\TemplateActionBuilder\MessageTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\LineBotService as LINEBot;

class RichMenuAiliasService
{
    protected $bot;

    public function __construct() {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $this->bot = $bot;
    }

    public function index() 
    {
        $data = $this->bot->getRichMenuAliasList()->getJSONDecodedBody()['aliases'];
        foreach ($data as $k => $v) {
            $data[$k]['name'] = $this->bot->getRichMenu($v['richMenuId'])->getJSONDecodedBody()['name'] ?? 'null';
        }
        return $data;
    }


    public function store($richMenuAliasId, $richMenuId) 
    {
        $response = $this->bot->createRichMenuAlias($richMenuAliasId, $richMenuId);
        return $response->getJSONDecodedBody();
    }


    public function show($id) 
    {
        return $this->bot->getRichMenu($id)->getJSONDecodedBody();
    }


    public function update() 
    {
        //
    }


    public function destroy() 
    {
        //
    }

}
