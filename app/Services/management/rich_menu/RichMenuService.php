<?php

namespace App\Services\management\rich_menu;

use App\Services\management\AbstractManagementService;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot\RichMenuBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuSizeBuilder;
use LINE\LINEBot\TemplateActionBuilder\MessageTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

class RichMenuService
{
    protected $bot;

    public function __construct($bot) {
        $this->bot = $bot;
    }

    public function index() 
    {
        $response = $this->bot->getRichMenuList()->getJSONDecodedBody();
        foreach ($response['richmenus'] as $richmenu) {
            $data[] = ['richMenuId' => $richmenu['richMenuId'], 'name' => $richmenu['name']];
        }
        return $data;
    }


    public function store($request) 
    {
        $data = $request->all();
        $is_default = true;

        $height = 810;
        $width = 1200;
        $richMenuSizeBuilder = new RichMenuSizeBuilder($height, $width);
        $action = new RichMenuAction($data);

        $create_menu_area = new CreateRichMenuTemplateAction($action->getTemplateType(), $action->getActionTypes(), $action->getActions());
        $richMenuBuilder = new RichMenuBuilder($richMenuSizeBuilder, $is_default, $data['title'], $data['menuBarText'], $create_menu_area->create());
        $create_richmenu_response = $this->bot->createRichMenu($richMenuBuilder);

        //リッチメニューの画像をアップロードする
        $richmenu_id = $create_richmenu_response->getJSONDecodedBody()['richMenuId'];
        // Log::channel('line_webhook')->info(print_r($richmenu_id, true));
        $image_path = $request->file('image')->path();
        $contentType = 'image/png';
        $response = $this->bot->uploadRichMenuImage($richmenu_id, $image_path, $contentType);

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
