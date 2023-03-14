<?php

namespace App\Services\liff\order_destination;

use App\Models\OrderDestination;
use App\Models\User;

class OrderDestinationService
{
    private $format_order_destination_action;

    public function __construct(FormatOrderDestinationAction $format_order_destination_action)
    {
        $this->format_order_destination_action = $format_order_destination_action;
    }

    public function store($request, User $user)
    {
        $data = $request->only([
            'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
            'prefecture', 'city', 'address', 'building_name', 'tel', 'is_selected'
        ]);
        $merged_order_destination = $this->format_order_destination_action->mergeUserIdToArray($user, $data);
        return OrderDestination::create($merged_order_destination);
    }
}
