<?php

namespace App\Services\management\rich_menu;

class RichMenuConvertAction
{
    protected $data;

    public function __construct($data) {
        $this->data = $data;
    }

    public function getActionType() 
    {
        switch ($this->data['action']['type']) {
            case 'uri':
                return 1;
                break;
            case 'message':
                return 2;
                break;
            case 'richmenuswitch':
                return 3;
                break;
            default:
                return null;
                break;
        }
    }

    public function getValue()
    {
        switch ($this->getActionType()) {
            case 1:
                return $this->data['action']['uri'];
                break;
            case 2:
                return $this->data['action']['text'];
                break;
            case 3:
                return $this->data['action']['richMenuAliasId'];
                break;
            default:
                return null;
                break;
        }
    }
}
