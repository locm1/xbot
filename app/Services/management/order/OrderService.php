<?php

namespace App\Services\management\order;

use App\Models\Order;
use App\Services\management\AbstractManagementService;

class OrderService
{
    private $search_order_action;

    public function __construct(SearchOrderAction $search_order_action)
    {
        $this->search_order_action = $search_order_action;
    }

    public function index($request) 
    {
        if (isset($request)) {
            return $this->search_order_action->search($request);
        }

        return Order::with('user')->orderBy('id', 'desc')->paginate(10);
    }


    public function store() 
    {
        //
    }


    public function show(Order $order) 
    {
        return $order->with('coupon')->find($order->id);
    }


    public function update($request, Order $order) 
    {
        return $order->update($request->only(['status']));
    }


    public function destroy() 
    {
        //
    }

}
