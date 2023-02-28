<?php

namespace App\Services\management\product;

class FormatProductImageAction
{

    public function mergeProductIdToArray($product_images, $product)
    {
        $merged_product_images = array();
        foreach ($product_images as $product_image) {
            $merged_product_images[] = $product_image;
            //$merged_product_images[] = array_merge($product_image, ['product_id' => $product->id]);
        }
        return $merged_product_images;
    }
}
