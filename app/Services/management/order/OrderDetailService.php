<?php

namespace App\Services\management\order;

use App\Models\Order;
use App\Models\OrderHistory;

class OrderDetailService
{

    public function getOrderProductsById(Order $order) 
    {
        $order_products = $order::with('orderProducts.product.productImages')->find($order->id);
        $result_order_products = array();

        foreach ($order_products->orderProducts as $order_product) {
            $result_order_products[] = [
                'id' => $order_product->id,
                'product_id' => $order_product->product_id,
                'price' => $order_product->price,
                'quantity' => $order_product->quantity,
                'name' => $order_product->product->name,
                'product_image' => $order_product->product->productImages
            ];
        }
        return $result_order_products;
    }

    public function getOrderUserById(Order $order) 
    {
        return $order::with('user')->find($order->id);
    }
}
