<?php

namespace App\Services\api\payjp\customer;

use Payjp\Payjp;
use Payjp\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FormatCustomerAction
{
    public function getDefaultCard($cards, $customer)
    {
        $default_card = array_filter($cards, function($card) use ($customer) {
            return $card['id'] === $customer->default_card;
        });
        return array_values($default_card);
    }
}
