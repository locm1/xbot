<?php

namespace App\Http\Controllers\api\management\order;

use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use App\Services\management\order\OrderDetailService;
use Illuminate\Http\Request;

class OrderDeliveryController extends Controller
{
    private $order_detail_service;

    public function __construct(OrderDetailService $order_detail_service) {
        $this->order_detail_service = $order_detail_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(OrderHistory $order)
    {
        $order_delivery = $this->order_detail_service->getOrderDeliveryById($order);
        return response()->json(['order_delivery' => $order_delivery], 200);
    }
}
