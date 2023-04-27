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
        $merged_building_name = array_merge(
            $merged_order_destination, 
            ['building_name' => $request->building_name . ' ' .$request->room_number]
        );
        return OrderDestination::create($merged_building_name);
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
