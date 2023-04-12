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
use App\Services\management\rich_menu_alias\RichMenuAliasService;

class RichMenuService
{
    protected $bot;

    public function __construct() {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => 'tekitou']);
        $this->bot = $bot;
    }

    public function index() 
    {
        $response = $this->bot->getRichMenuList()->getJSONDecodedBody();
        $default_richmenu_id = $this->bot->getDefaultRichMenuId()->getJSONDecodedBody()['richMenuId'] ?? null;
        foreach ($response['richmenus'] as $richmenu) {
            $is_default = $default_richmenu_id === $richmenu['richMenuId'] ? 1 : 0;
            $form_value[] = ['richMenuId' => $richmenu['richMenuId'], 'name' => $richmenu['name'], 'isDefault' => $is_default];
        }
        return $form_value ?? null;
    }


    public function store($request, bool $should_create_alias) 
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
        Log::debug($create_richmenu_response->getJSONDecodedBody());
        $richmenu_id = $create_richmenu_response->getJSONDecodedBody()['richMenuId'];
        $image_path = $request->file('image')->path();
        $contentType = 'image/png';
        $response = $this->bot->uploadRichMenuImage($richmenu_id, $image_path, $contentType);

        //リッチメニューエイリアスを作成する
        if ($should_create_alias) {
            $reduce_richmenu_id = str_replace('richmenu-', '', $richmenu_id);
            $ailias_service = new RichMenuAliasService;
            $response = $ailias_service->store($reduce_richmenu_id, $richmenu_id);
        }

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
                    break;
            }
            $form_value = array_diff($form_value, array(null));
        }
        return $form_value;
    }


    public function update() 
    {
        //
    }


    public function destroy(string $id, bool $should_deleate_aliase, string $new_richmenu_id = null) 
    {
        $data = $this->bot->getRichMenuAliasList()->getJSONDecodedBody()['aliases'];
        if ($should_deleate_aliase) {
            //リッチメニューエイリアスを削除
            foreach ($data as $k => $v) {
                if ($v['richMenuId'] === $id) {
                    $alias_id = $v['richMenuAliasId'];
                    if ($alias_id) {
                        $this->bot->deleteRichMenuAlias($alias_id)->getJSONDecodedBody();
                    }
                }
            }
        } else {
            //リッチメニューエイリアスを更新
            foreach ($data as $k => $v) {
                if ($v['richMenuId'] === $id) {
                    $this->bot->updateRichMenuAlias($v['richMenuAliasId'], $new_richmenu_id);
                }
            }
        }

        //リッチメニューを削除
        return $this->bot->deleteRichMenu($id)->getJSONDecodedBody();
    }

}
