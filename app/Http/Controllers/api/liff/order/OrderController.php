<?php

namespace App\Http\Controllers\api\liff\order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Services\liff\cart\DeleteCartService;
use App\Services\liff\order\OrderService;
use App\Services\liff\order\StockQuantityCheckerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    private $order_service;
    private $delete_cart_service;

    public function __construct(OrderService $order_service, DeleteCartService $delete_cart_service)
    {
        $this->order_service = $order_service;
        $this->delete_cart_service = $delete_cart_service;
    }

    /**
     * Display a listing of the resource.
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $orders = $this->order_service->index($request, $user);
        return response()->json(['orders' => $orders], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $stock_quantity_checker_service = new StockQuantityCheckerService();
        $check_result = $stock_quantity_checker_service($request->order_products);

        if ($check_result['status'] == 'failed') {
            # 対象の商品をカートから削除
            $this->delete_cart_service->deleteCartByProductIds($user, $check_result['product_ids']);
            return response()->json($check_result, 500);
        }

        $order = $this->order_service->store($request, $user);
        return response()->json(['order' => $order], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, Order $order)
    {
        $order = $this->order_service->show($order);
        return response()->json(['order' => $order], 200);
    }
}
