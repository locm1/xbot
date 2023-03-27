<?php

namespace App\Http\Controllers\api\liff\order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Services\liff\order\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private $order_service;

    public function __construct(OrderService $order_service)
    {
        $this->order_service = $order_service;
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
