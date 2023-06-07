<?php

namespace App\Http\Controllers\api\liff\order_destination;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\order_destination\StoreOrderDestinationRequest;
use App\Http\Requests\liff\order_destination\UpdateOrderDestinationRequest;
use App\Models\OrderDestination;
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
     * Display a listing of the resource.
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $order_destinations = $this->order_destination_service->index($user);
        return response()->json(['order_destinations' => $order_destinations], 200);
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

    /**
     * Display the specified resource.
     * @param  UpdateOrderDestinationRequest  $request
     * @param  User $user
     * @param  OrderDestination $destination
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderDestinationRequest $request, User $user, OrderDestination $destination)
    {
        $order_destination = $this->order_destination_service->update($request, $user, $destination);
        return response()->json(['order_destination' => $order_destination], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @param  OrderDestination $destination
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, OrderDestination $destination)
    {
        $order_destination = $this->order_destination_service->show($destination);
        return response()->json(['order_destination' => $order_destination], 200);
    }
}
