<?php

namespace App\Http\Controllers\api\liff\order_destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\order_destination\StoreOrderDestinationRequest;
use App\Models\User;
use App\Services\liff\order_destination\OrderDestinationService;
use Illuminate\Http\Request;

class OrderDestinationController extends Controller
{
    private $order_destination_service;

    public function __construct(OrderDestinationService $order_destination_service)
    {
        $this->order_destination_service = $order_destination_service;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreOrderDestinationRequest  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderDestinationRequest $request, User $user)
    {
        $order_destination = $this->order_destination_service->store($request, $user);
        return response()->json(['order_destination' => $order_destination], 200);
    }
}
