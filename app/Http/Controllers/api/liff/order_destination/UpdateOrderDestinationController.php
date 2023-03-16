<?php

namespace App\Http\Controllers\api\liff\order_destination;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\order_destination\UpdateOrderDestinationService;
use Illuminate\Http\Request;

class UpdateOrderDestinationController extends Controller
{
    private $update_order_destination_service;

    public function __construct(UpdateOrderDestinationService $update_order_destination_service)
    {
        $this->update_order_destination_service = $update_order_destination_service;
    }

    /**
     * Handle the incoming request.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $order_destination = $this->update_order_destination_service->updateSelectedOrderDestinations($user);
        return response()->json(['order_destination' => $order_destination], 200);
    }
}
