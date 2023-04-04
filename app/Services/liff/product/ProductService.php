<?php

namespace App\Services\liff\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\Log;

class ProductService
{
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
        $update_products = array();

        $product_ids = array_column($order_products, 'product_id');
        $products = Product::whereIn('id', $product_ids)->orderBy('id', 'asc')->get()->toArray();
        array_multisort($product_ids, SORT_ASC, $order_products);
        
        foreach (array_map(null, $products, $order_products) as [$product, $order_product]) {
            $update_products[] = [
                'id' => $product['id'],
                'stock_quantity' => $product['stock_quantity'] - $order_product['quantity'],
                'product_category_id' => $product['product_category_id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'overview' => $product['overview'],
                'is_undisclosed' => $product['is_undisclosed'],
                'is_unlimited' => $product['is_unlimited'],
                'is_picked_up' => $product['is_picked_up'],
            ];
        }
        Product::upsert($update_products, ['id'], ['stock_quantity']);
    }
}
