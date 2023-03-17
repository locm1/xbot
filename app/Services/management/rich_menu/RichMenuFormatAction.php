<?php

namespace App\Services\management\rich_menu;

use App\Consts\RichMenuTemplateConsts;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

class RichMenuFormatAction
{
    protected $data;

    public function __construct($data) {
        $this->data = $data;
    }

    public function getTemplateType() 
    {
        return $this->data['menuType'];
    }

    public function getActionTypes() :array
    {
        return [
            $this->data['A-type'] ?? null,
            $this->data['B-type'] ?? null,
            $this->data['C-type'] ?? null,
            $this->data['D-type'] ?? null,
            $this->data['E-type'] ?? null,
            $this->data['F-type'] ?? null,
        ];
    }

    public function getActions()
    {
        return [
            $this->data['A-value'] ?? null,
            $this->data['B-value'] ?? null,
            $this->data['C-value'] ?? null,
            $this->data['D-value'] ?? null,
            $this->data['E-value'] ?? null,
            $this->data['F-value'] ?? null,
        ];
    }
}
