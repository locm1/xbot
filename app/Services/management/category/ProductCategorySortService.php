<?php

namespace App\Services\management\category;

use App\Models\ProductCategory;
use App\Services\common\DisplayOrderUtility;

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
        $display_order = DisplayOrderUtility::getDisplayOrder($begin_item, $end_item);
        $category->update(['display_order' => $display_order]);
        return $display_order;
    }

}
