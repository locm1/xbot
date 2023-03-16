<?php

namespace App\Services\management\rich_menu;

use App\Consts\RichMenuTemplateConsts;
use App\Consts\RichMenuTemplateSecondConsts;
use Error;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBoundsBuilder;
use LINE\LINEBot\RichMenuBuilder\RichMenuAreaBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;
use ReflectionClass;

class RichMenuAction
{
    public function getTemplateType($size, $areas)
    {
        foreach ($areas as $k => $v) {
            $bounds[$k] = $v['bounds'];
            $bounds[$k]['label'] = $v['action']['label'];
        }
        if ($size['height'] === RichMenuTemplateConsts::HEIGHT) {
            $template_consts = $this->getAllTemplateConsts(1);
        } elseif ($size['height'] === RichMenuTemplateSecondConsts::HEIGHT) {
            $template_consts = $this->getAllTemplateConsts(2);
        }
        foreach ($template_consts as $k => $v) {
            if ($v == $bounds) {
                $int_type = $this->convertTemplateTypeToInt($k);
                return $int_type;
            }
        }
        return 0;
    }

    private function getAllTemplateConsts($type)
    {
        if ($type === 1) {
            $reflaction = new ReflectionClass(RichMenuTemplateConsts::class);
            $data = $reflaction->getConstants();
            unset($data['WIDTH']);
            unset($data['HEIGHT']);
            return $data;
        } else if ($type === 2) {
            $reflaction = new ReflectionClass(RichMenuTemplateSecondConsts::class);
            $data = $reflaction->getConstants();
            unset($data['WIDTH']);
            unset($data['HEIGHT']);
            return $data;
        }
    }

    private function convertTemplateTypeToInt(string $type) :int
    {
        switch ($type) {
            case 'TYPE_A':
                return 1;
                break;

            case 'TYPE_B':
                return 2;
                break;
            
            case 'TYPE_C':
                return 3;
                break;
            
            case 'TYPE_D':
                return 4;
                break;
            
            case 'TYPE_E':
                return 5;
                break;
            
            case 'TYPE_F':
                return 6;
                break;
            
            case 'TYPE_G':
                return 7;
                break;
            
            case 'TYPE_H':
                return 8;
                break;
            
            case 'TYPE_I':
                return 9;
                break;
            
            case 'TYPE_J':
                return 10;
                break;
            
            case 'TYPE_K':
                return 11;
                break;
            
            case 'TYPE_L':
                return 12;
                break;
            
            case 'TYPE_M':
                return 13;
                break;
            
            default:
                return 0;
                break;
        }
    }
}
