<?php

namespace App\Services\management\order;

use App\Models\OrderHistory;
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

        return OrderHistory::with(['OrderDestination', 'user'])->paginate(10);
    }


    public function store() 
    {
        //
    }


    public function show(OrderHistory $order) 
    {
        return $order->with('coupon')->find($order->id);
    }


    public function update($request, OrderHistory $order) 
    {
        $data = $request->only(['status']);
        return $order->update($data);
    }


    public function destroy() 
    {
        //
    }

}
