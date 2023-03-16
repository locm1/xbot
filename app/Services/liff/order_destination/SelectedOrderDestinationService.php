<?php

namespace App\Services\liff\order_destination;

use App\Models\OrderDestination;
use App\Models\User;

class SelectedOrderDestinationService
{
    public function getSelectedOrderDestinationByUser(User $user)
    {
        return OrderDestination::where('user_id', $user->id)->where('is_selected', 1)->first();
    }
}
