<?php

namespace App\Services\liff\order_destination;

use App\Models\OrderDestination;
use App\Models\User;

class UpdateOrderDestinationService
{
    public function updateSelectedOrderDestinations(User $user)
    {
        return $user->orderDestinations()->update([
            'is_selected' => 0
        ]);
    }
}
