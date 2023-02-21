<?php

namespace App\Services\management\order;

use App\Models\OrderHistory;

class OrderDetailService
{

    public function getOrderProductsById(OrderHistory $order) 
    {
        $order_products = $order::with('orderProducts.product.productImages')->find($order->id);
        $result_order_products = array();

        foreach ($order_products->orderProducts as $order_product) {
            $result_order_products[] = [
                'id' => $order_product->id,
                'product_id' => $order_product->product_id,
                'quantity' => $order_product->quantity,
                'name' => $order_product->product->name,
                'product_image' => $order_product->product->productImages
            ];
        }
        return $result_order_products;
    }

    public function getOrderDeliveryById(OrderHistory $order) 
    {
        return $order::with('orderUser')->find($order->id);
    }

    public function getOrderUserById(OrderHistory $order) 
    {
        return $order::with('user')->find($order->id);
    }
}
