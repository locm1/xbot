<?php

namespace App\Services\management\rich_menu;

use App\Consts\RichMenuTemplateConsts;
use App\Consts\RichMenuTemplateSecondConsts;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\TemplateActionBuilder\MessageTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\PostbackTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\RichMenuSwitchTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

class CreateRichMenuTemplateAction
{
    protected $template_type;
    protected $action_types;
    protected $actions;

    public function __construct(int $template_type, array $action_types, array $actions) {
        $this->template_type = $template_type;
        $this->action_types = $action_types;
        $this->actions = $actions;
    }

    public function create() 
    {
        if ($this->template_type == 1) {
            $type_data = RichMenuTemplateConsts::TYPE_A;
        } else if ($this->template_type == 2) {
            $type_data = RichMenuTemplateConsts::TYPE_B;
        } else if ($this->template_type == 3) {
            $type_data = RichMenuTemplateConsts::TYPE_C;
        } else if ($this->template_type == 4) {
            $type_data = RichMenuTemplateConsts::TYPE_D;
        } else if ($this->template_type == 5) {
            $type_data = RichMenuTemplateConsts::TYPE_E;
        } else if ($this->template_type == 6) {
            $type_data = RichMenuTemplateConsts::TYPE_F;
        } else if ($this->template_type == 7) {
            $type_data = RichMenuTemplateConsts::TYPE_G;
        } else if ($this->template_type == 8) {
            $type_data = RichMenuTemplateSecondConsts::TYPE_H;
        } else if ($this->template_type == 9) {
            $type_data = RichMenuTemplateSecondConsts::TYPE_I;
        } else if ($this->template_type == 10) {
            $type_data = RichMenuTemplateSecondConsts::TYPE_J;
        } else if ($this->template_type == 11) {
            $type_data = RichMenuTemplateSecondConsts::TYPE_K;
        } else if ($this->template_type == 12) {
            $type_data = RichMenuTemplateSecondConsts::TYPE_L;
        }
        $richMenuAreaBuilders = array();

        foreach ($type_data as $k => $v) {
            if (!$this->actions[$k]) {
                $templateActionBuilder = new PostbackTemplateActionBuilder($v['label'], 'null');
            } else if ($this->action_types[$k] == 1) {
                $templateActionBuilder = new UriTemplateActionBuilder($v['label'], $this->actions[$k]);
            } else if ($this->action_types[$k] == 2) {
                $templateActionBuilder = new MessageTemplateActionBuilder($v['label'], $this->actions[$k]);
            } else if ($this->action_types[$k] == 3) {
                $templateActionBuilder = new RichMenuSwitchTemplateActionBuilder($this->actions[$k], 'test', $v['label']);
            }
            $richMenuAreaBoundsBuilder = new RichMenuAreaBoundsBuilder($v['x'], $v['y'], $v['width'], $v['height']);
            $richMenuAreaBuilders[] = new RichMenuAreaBuilder($richMenuAreaBoundsBuilder, $templateActionBuilder);
        }
        return $richMenuAreaBuilders;
    }

}
