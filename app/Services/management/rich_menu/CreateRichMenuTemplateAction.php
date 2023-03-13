<?php

namespace App\Services\management\rich_menu;

use App\Consts\RichMenuTemplateConsts;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
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
        }
        if ($this->template_type == 2) {
            $type_data = RichMenuTemplateConsts::TYPE_B;
        }
        foreach ($type_data as $k => $v) {
            $richMenuAreaBoundsBuilder = new RichMenuAreaBoundsBuilder($v['x'], $v['y'], $v['width'], $v['height']);
            if ($this->actions[$k]) {
                $templateActionBuilder = new UriTemplateActionBuilder($v['label'], $this->actions[$k]);
            }
            $richMenuAreaBuilders[] = new RichMenuAreaBuilder($richMenuAreaBoundsBuilder, $templateActionBuilder);
        }
        return $richMenuAreaBuilders;
    }

}
