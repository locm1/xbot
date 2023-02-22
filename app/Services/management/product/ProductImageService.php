<?php

namespace App\Services\management\product;

use App\Models\Product;

class ProductImageService
{

    public function index($product) 
    {
        return $product->productImages;
    }
}
