<?php

namespace App\Services\liff\product;

use App\Models\Product;

class FormatProductAction
{
    public function createBulkUpdateArray($order_products)
    {
        $update_products = array();

        $product_ids = array_column($order_products, 'product_id');
        $products = Product::whereIn('id', $product_ids)->orderBy('id', 'asc')->get()->toArray();
        array_multisort($product_ids, SORT_ASC, $order_products);
        
        foreach (array_map(null, $products, $order_products) as [$product, $order_product]) {
            if ($product['is_unlimited'] == 0) {
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
            } else {
                $update_products[] = [
                    'id' => $product['id'],
                    'stock_quantity' => $product['stock_quantity'],
                    'product_category_id' => $product['product_category_id'],
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'overview' => $product['overview'],
                    'is_undisclosed' => $product['is_undisclosed'],
                    'is_unlimited' => $product['is_unlimited'],
                    'is_picked_up' => $product['is_picked_up'],
                ];
            }
        }
        return $update_products;
    }
}
