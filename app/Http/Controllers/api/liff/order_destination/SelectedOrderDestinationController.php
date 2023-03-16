<?php

namespace App\Http\Controllers\api\liff\order_destination;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\order_destination\SelectedOrderDestinationService;
use Illuminate\Http\Request;

class SelectedOrderDestinationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SelectedOrderDestinationService $selected_order_destination_service, User $user)
    {
        $order_destination = $selected_order_destination_service->getSelectedOrderDestinationByUser($user);
        return response()->json(['order_destination' => $order_destination], 200);
    }
}
