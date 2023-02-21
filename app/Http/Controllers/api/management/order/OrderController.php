<?php

namespace App\Http\Controllers\api\management\order;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\order\UpdateOrderRequest;
use App\Models\OrderHistory;
use App\Services\management\order\OrderService;
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
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = $this->order_service->index($request);
        return response()->json(['orders' => $orders], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(OrderHistory $order)
    {
        $order = $this->order_service->show($order);
        return response()->json(['order' => $order], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  OrderHistory $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, OrderHistory $order)
    {
        $order = $this->order_service->update($request, $order);
        return response()->json(['order' => $order], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
