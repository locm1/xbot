<?php

namespace App\Services\liff\order;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use App\Services\liff\order\SearchOrderAction;
use App\Services\api\payjp\charge\ChargeService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService
{
    private $format_order_action;
    private $charge_service;
    private $search_order_action;

    public function __construct(
        FormatOrderAction $format_order_action, 
        ChargeService $charge_service,
        SearchOrderAction $search_order_action
    )
    {
        $this->format_order_action = $format_order_action;
        $this->charge_service = $charge_service;
        $this->search_order_action = $search_order_action;
    }

    public function index($request, User $user)
    {
        if ($request->time) {
            return $this->search_order_action->search($request->time, $user);
        }
        return Order::with('orderProducts.product.productImages')->where('user_id', $user->id)->get();
    }

    public function store($request, User $user)
    {
        $order = $request->order;
        $order_products = $request->order_products;

        if ($order['payment_method'] == 1) {
            # pay.jp APIで決済
            $payment_id = $this->charge_service->charge($request->charge);
        }
        
        # トランザクションの実行
        DB::beginTransaction();
        try {
            # 注文を作成し、注文IDをマージしてバルクアップサート
            $order = Order::create($order);
            $merged_order_products = $this->format_order_action->mergeOrderIdToArray($order, $order_products);
            OrderProduct::upsert($merged_order_products, ['id']);

            # ユーザーに紐づくカート情報の削除
            $user->carts()->delete();

            DB::commit();
        } catch (\Exception $e) {
            if ($order['payment_method'] == 1) {
                # pay.jp APIで決済の取り消し
                $this->charge_service->refund($payment_id);
            }
            Log::debug($e);
            DB::rollback();
            throw $e;
        }
        
        return $order;
    }

    public function show(Order $order)
    {
        return Order::with('orderProducts.product.productImages')->find($order->id);
    }
}
