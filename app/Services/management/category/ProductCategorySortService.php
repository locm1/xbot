<?php

namespace App\Services\management\category;

use App\Models\ProductCategory;

class ProductCategorySortService
{
    /**
     * sort category.
     *
     * @param \Illuminate\Http\Request  $request
     * @param ProductCategory $category
     */
    public function sort($request, ProductCategory $category) 
    {
        $begin_item = $request->begin_item;
        $end_item = $request->end_item;
        $display_order = $this->getDisplayOrder($begin_item, $end_item);
        $category->update(['display_order' => $display_order]);
        return $display_order;
    }

    /**
     * 
     * 取得した始めと終わりのDisplayOrderの中間を取得
     */
    private function getDisplayOrder($begin_item, $end_item)
    {
        if (!isset($begin_item) && isset($end_item)) {
            return $this->calculateEndDisplayOrder($end_item['display_order']);
        } elseif (isset($begin_item) && !isset($end_item)) {
            return $this->calculateBeginDisplayOrder($begin_item['display_order']);
        } else {
            return $this->calculateDisplayOrder($begin_item['display_order'], $end_item['display_order']);
        }
    }

    private function calculateDisplayOrder($begin_display_order, $end_display_order)
    {
        return ($begin_display_order + $end_display_order) / 2.0;
    }

    private function calculateEndDisplayOrder($end_display_order)
    {
        return $end_display_order - 1.0;
    }

    private function calculateBeginDisplayOrder($begin_display_order)
    {
        return $begin_display_order  + 1.0;
    }

}
