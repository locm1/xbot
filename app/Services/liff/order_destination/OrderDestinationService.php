<?php

namespace App\Services\liff\order_destination;

use App\Models\OrderDestination;
use App\Models\User;
use App\Services\common\MergeArrayUtility;

class OrderDestinationService
{
    public function index(User $user)
    {
        return $user->orderDestinations;
    }

    public function store($request, User $user)
    {
        $data = $request->only([
            'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
            'prefecture', 'city', 'address', 'building_name', 'tel', 'is_selected'
        ]);
        $merged_order_destination = MergeArrayUtility::mergeUserIdToArray($user->id, $data);
        return OrderDestination::create($merged_order_destination);
    }

    public function show(OrderDestination $destination)
    {
        return $destination;
    }

    public function update($request, $destination)
    {
        $data = $request->only([
            'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
            'prefecture', 'city', 'address', 'building_name', 'tel', 'is_selected'
        ]);
        return $destination->update($data);
    }
}
