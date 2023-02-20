<?php

namespace App\Services\management\order;

use App\Models\OrderHistory;
use App\Services\management\AbstractManagementService;

class OrderService
{

    public function index() 
    {
        return OrderHistory::with(['orderUser', 'user'])->paginate(10);
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
