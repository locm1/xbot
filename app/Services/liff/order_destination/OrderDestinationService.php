<?php

namespace App\Services\liff\order_destination;

use App\Models\OrderDestination;
use App\Models\User;
use App\Services\common\MergeArrayUtility;
use Illuminate\Support\Facades\DB;

class OrderDestinationService
{
    public function index(User $user)
    {
        return $user->orderDestinations;
    }

    public function store($request, User $user)
    {
        return DB::transaction(function () use ($request, $user) {
            $data = $request->only([
                'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
                'prefecture', 'city', 'address', 'building_name', 'tel', 'is_selected'
            ]);
            $merged_order_destination = MergeArrayUtility::mergeUserIdToArray($user->id, $data);
            $merged_building_name = array_merge(
                $merged_order_destination, 
                ['building_name' => $request->building_name . ' ' .$request->room_number]
            );

            $user_update_data = $request->only([
                'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
                'prefecture', 'city', 'address', 'building_name', 'tel'
            ]);

            //そのユーザーがアンケートに答えていなかったら更新
            if (!isset($user->zipcode)) {
                $user->update($user_update_data);
            }

            return OrderDestination::create($merged_building_name);
        });
    }

    public function show(OrderDestination $destination)
    {
        return $destination;
    }

    public function update($request, User $user, OrderDestination $destination)
    {
        return DB::transaction(function () use ($request, $user, $destination) {
            $data = $request->only([
                'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
                'prefecture', 'city', 'address', 'building_name', 'tel', 'is_selected'
            ]);

            $user_update_data = $request->only([
                'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
                'prefecture', 'city', 'address', 'building_name', 'tel'
            ]);

            //そのユーザーがアンケートに答えていなかったら更新
            if (!isset($user->zipcode)) {
                $user->update($user_update_data);
            }

            return $destination->update($data);
        });
    }

    public function destroy(OrderDestination $destination)
    {
        return $destination->delete();
    }
}
