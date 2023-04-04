<?php

namespace App\Services\liff\order;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;
use App\Services\liff\product\FormatProductAction;
use Illuminate\Support\Facades\Log;

class StockQuantityCheckerService
{
    public function __invoke($order_products): array
    {
        $product_ids = array();
        $format_product_action = new FormatProductAction();
        $update_products = $format_product_action->createBulkUpdateArray($order_products);

        foreach ($update_products as $update_product) {
            if ($update_product['stock_quantity'] < 0) {
                $product_ids[] = $update_product['id'];
                $status = 'failed';
                $message = '購入数量が在庫数を超えているので、カートの商品を削除しました。注文内容を再確認してください';
            } else {
                $status = 'success';
                $message = '注文が受け付けられました。発送までしばらくお待ちください';
            }
        }

        return [
            'status' => $status,
            'message' => $message,
            'product_ids' => $product_ids
        ];
    }
}
