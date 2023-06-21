<?php

namespace App\Services\liff\order;

use App\Mail\OrderMail;
use App\Models\Cart;
use App\Models\InviteeIncentiveUser;
use App\Models\InviterIncentiveUser;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use App\Services\api\line\invite\InviteService;
use App\Services\liff\order\SearchOrderAction;
use App\Services\api\payjp\charge\ChargeService;
use App\Services\liff\invite\IssueInviteIncentiveService;
use App\Services\liff\mail\OrderMailService;
use App\Services\liff\product\ProductService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrderService
{
    private $format_order_action;
    private $charge_service;
    private $search_order_action;
    private $product_service;
    private $order_mail_service;

    public function __construct(
        FormatOrderAction $format_order_action, 
        ChargeService $charge_service,
        SearchOrderAction $search_order_action,
        ProductService $product_service,
        OrderMailService $order_mail_service
    )
    {
        $this->format_order_action = $format_order_action;
        $this->charge_service = $charge_service;
        $this->search_order_action = $search_order_action;
        $this->product_service = $product_service;
        $this->order_mail_service = $order_mail_service;
    }

    public function index($request, User $user)
    {
        if ($request->time) {
            return $this->search_order_action->search($request->time, $user);
        }
        return Order::where('user_id', $user->id)
            ->with(['orderProducts.product.productImages', 'orderProducts.product.productSale', 'coupon'])
            ->orderBy('orders.id', 'desc')
            ->get();
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

            # カートに保存された商品在庫数の変更
            $this->product_service->update($merged_order_products);

            # 注文メール送信
            $this->order_mail_service->sendOrderMail($order, $merged_order_products);

            DB::commit();

            # ユーザーが初購入の場合、インセンティブ発行
            if (Order::where('user_id', $user->id)->count() === 1) {
                $issued = (new InviteService)($user->id, 4);
            }
        } catch (\Exception $e) {
            if ($order['payment_method'] == 1) {
                # pay.jp APIで決済の取り消し
                $this->charge_service->refund($payment_id);
            }
            DB::rollback();
        }
        
        return $order;
    }

    public function show(Order $order)
    {
        return Order::with(['orderProducts.product.productImages', 'orderProducts.product.productSale', 'coupon'])->find($order->id);
    }
}
