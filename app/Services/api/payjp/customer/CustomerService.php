<?php

namespace App\Services\api\payjp\customer;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Payjp\Payjp;
use Payjp\Customer;
use Illuminate\Support\Facades\DB;

class CustomerService
{
    private $secret_key;

    public function __construct() {
        $this->secret_key = config('api_key.PAYJP_SECRET_KEY');
    }

    public function store($request, User $user)
    {
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);

        $customer = Customer::create([
            'card' => $request->payjp_token,
            'description' => "userId: {$user->id}",
        ]);
        return $customer->id;
    }
}
