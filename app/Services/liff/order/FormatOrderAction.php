<?php

namespace App\Services\liff\order;

class FormatOrderAction
{
    /**
     * 
     *
     * @return array
     **/
    public function mergeOrderIdToArray($order, $order_products): array
    {
        $merged_order_products = array();

        foreach ($order_products as $order_product) {
            $merged_order_products[] = [
                'order_id' => $order->id,
                'product_id' => $order_product['product_id'],
                'quantity' => $order_product['quantity']
            ];
        }
        return $merged_order_products;
    }

}
