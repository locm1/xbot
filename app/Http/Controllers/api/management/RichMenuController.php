<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\LineBotService as LINEBot;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot\RichMenuBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuSizeBuilder;
use LINE\LINEBot\TemplateActionBuilder\MessageTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

class RichMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "a";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $is_default = true;

        $height = 810;
        $width = 1200;
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $richMenuSizeBuilder = new RichMenuSizeBuilder($height, $width);
        $richMenuAreaBoundsBuilder = new RichMenuAreaBoundsBuilder(0, 0, 810, 1200);
        $templateActionBuilder = new UriTemplateActionBuilder('this is label', 'https://www.google.com/?hl=ja');
        $richMenuAreaBuilder = new RichMenuAreaBuilder($richMenuAreaBoundsBuilder, $templateActionBuilder);


        $richMenuBuilder = new RichMenuBuilder($richMenuSizeBuilder, $is_default, $data['title'], $data['menuBarText'], $richMenuAreaBuilder);
        $create_richmenu_response = $bot->createRichMenu($richMenuBuilder);

        //リッチメニューの画像をアップロードする
        $richmenu_id = $create_richmenu_response->getRawBody();
        $image_path = $request->file('image')->path();
        $contentType = 'image/png';
        $response = $bot->uploadRichMenuImage($richmenu_id, $image_path, $contentType);

        return $request->file('image')->path();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
