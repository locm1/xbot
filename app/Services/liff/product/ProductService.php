<?php

namespace App\Services\liff\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\Log;

class ProductService
{
    private $format_product_action;

    public function __construct(FormatProductAction $format_product_action)
    {
        $this->format_product_action = $format_product_action;
    }

    public function index() 
    {
        return Product::with(['productImages', 'productSale'])->where('is_undisclosed', 0)->get();
    }

    public function getCategoryByProduct(Product $product)
    {
        return $product->productCategory;
    }

    public function update($order_products)
    {
        $update_products = $this->format_product_action->createBulkUpdateArray($order_products);
        Product::upsert($update_products, ['id'], ['stock_quantity']);
    }
}
