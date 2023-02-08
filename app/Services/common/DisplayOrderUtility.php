<?php

namespace App\Services\common;

class DisplayOrderUtility
{
    /**
     * 
     * 取得した始めと終わりのDisplayOrderの中間を取得
     */
    public static function getDisplayOrder($begin_item, $end_item)
    {
        if (!isset($begin_item) && isset($end_item)) {
            return self::calculateEndDisplayOrder($end_item['display_order']);
        } elseif (isset($begin_item) && !isset($end_item)) {
            return self::calculateBeginDisplayOrder($begin_item['display_order']);
        } else {
            return self::calculateDisplayOrder($begin_item['display_order'], $end_item['display_order']);
        }
    }

    private static function calculateDisplayOrder($begin_display_order, $end_display_order)
    {
        return ($begin_display_order + $end_display_order) / 2.0;
    }

    private static function calculateEndDisplayOrder($end_display_order)
    {
        return $end_display_order - 1.0;
    }

    private static function calculateBeginDisplayOrder($begin_display_order)
    {
        return $begin_display_order  + 1.0;
    }
}
