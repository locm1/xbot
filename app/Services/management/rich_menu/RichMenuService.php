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
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use App\Services\api\LineBotService as LINEBot;
use App\Services\management\rich_menu_ailias\RichMenuAiliasService;

class RichMenuService
{
    protected $bot;

    public function __construct() {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $this->bot = $bot;
    }

    public function index() 
    {
        $response = $this->bot->getRichMenuList()->getJSONDecodedBody();
        foreach ($response['richmenus'] as $richmenu) {
            $form_value[] = ['richMenuId' => $richmenu['richMenuId'], 'name' => $richmenu['name']];
        }
        return $form_value;
    }


    public function store($request) 
    {
        $form_value = $request->all();
        $is_default = true;

        $height = 810;
        $width = 1200;
        $richMenuSizeBuilder = new RichMenuSizeBuilder($height, $width);
        $action = new RichMenuFormatAction($form_value);

        $create_menu_area = new CreateRichMenuTemplateAction($action->getTemplateType(), $action->getActionTypes(), $action->getActions());
        $richMenuBuilder = new RichMenuBuilder($richMenuSizeBuilder, $is_default, $form_value['title'], $form_value['menuBarText'], $create_menu_area->create());
        $create_richmenu_response = $this->bot->createRichMenu($richMenuBuilder);

        //リッチメニューの画像をアップロードする
        $richmenu_id = $create_richmenu_response->getJSONDecodedBody()['richMenuId'];
        $image_path = $request->file('image')->path();
        $contentType = 'image/png';
        $response = $this->bot->uploadRichMenuImage($richmenu_id, $image_path, $contentType);

        $reduce_richmenu_id = str_replace('richmenu-', '', $richmenu_id);
        $ailias_service = new RichMenuAiliasService;
        $response = $ailias_service->store($reduce_richmenu_id, $richmenu_id);

        //デフォルトのリッチメニューに登録する
        $this->bot->setDefaultRichMenuId($richmenu_id);

        return $richmenu_id;
    }


    public function show($id) 
    {
        $line_data = $this->bot->getRichMenu($id)->getJSONDecodedBody();
        $form_value = [
            'title' => $line_data['name'],
            'menuBarText' => $line_data['chatBarText'],
        ];
        $action = new RichMenuAction;
        $form_value['menuType'] = $action->getTemplateType($line_data['size'], $line_data['areas']);
        foreach ($line_data['areas'] as $k => $v) {
            $actions = new RichMenuConvertAction($v);
            switch ($v['action']['label']) {
                case 'a':
                    $form_value['A-type'] = $actions->getActionType();
                    $form_value['A-value'] = $actions->getValue();
                    break;
                case 'b':
                    $form_value['B-type'] = $actions->getActionType();
                    $form_value['B-value'] = $actions->getValue();
                    break;
                case 'c':
                    $form_value['C-type'] = $actions->getActionType();
                    $form_value['C-value'] = $actions->getValue();
                    break;
                case 'd':
                    $form_value['D-type'] = $actions->getActionType();
                    $form_value['D-value'] = $actions->getValue();
                    break;
                case 'e':
                    $form_value['E-type'] = $actions->getActionType();
                    $form_value['E-value'] = $actions->getValue();
                    break;
                case 'f':
                    $form_value['F-type'] = $actions->getActionType();
                    $form_value['F-value'] = $actions->getValue();
                    break;
                default:
                    # code...
                    break;
            }
        }
        return $form_value;
    }


    public function update() 
    {
        //
    }


    public function destroy($id) 
    {
        //リッチメニューエイリアスを削除
        $data = $this->bot->getRichMenuAliasList()->getJSONDecodedBody()['aliases'];
        foreach ($data as $k => $v) {
            if ($v['richMenuId'] === $id) {
                $alias_id = $v['richMenuAliasId'];
            }
        }
        if ($alias_id ?? false) {
            $this->bot->deleteRichMenuAlias($alias_id)->getJSONDecodedBody();
        }

        //リッチメニューを削除
        return $this->bot->deleteRichMenu($id)->getJSONDecodedBody();
    }

}
