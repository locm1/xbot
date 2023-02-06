<?php

namespace App\Services\management\category;

use App\Models\ProductCategory;

class FormatProductCategoryAction
{
    /**
     * カテゴリーのソート順から最大値を取得
     * @return float
     **/
    private function getMaxDisplayOrder(): float
    {
        return ProductCategory::max('display_order');
    }

    /**
     * 最大値を取得し、+1したorderをマージ
     *
     * @return array
     **/
    public function mergeDisplayOrderToArray($attributes): array
    {
        $display_order = ['display_order' => $this->getMaxDisplayOrder() + 1.0];
        return array_merge($attributes, $display_order);
    }

}
