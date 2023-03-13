<?php

namespace App\Services\liff\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;

class ProductService
{
    public function index() 
    {
        return Product::with('productImages')->where('is_undisclosed', 0)->get();
    }

    public function getCategoryByProduct(Product $product)
    {
        return $product->productCategory;
    }
}
