<?php

namespace App\Services\api\payjp\customer;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Payjp\Payjp;
use Payjp\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\api\payjp\customer\FormatCustomerAction;

class CustomerService
{
    private $secret_key;
    private $format_customer_action;

    public function __construct(FormatCustomerAction $format_customer_action)
    {
        $this->secret_key = config('api_key.PAYJP_SECRET_KEY');
        $this->format_customer_action = $format_customer_action;
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);
    }
    
    public function show($customer_id)
    {
        $customer = Customer::retrieve($customer_id);
        $cards = $customer->cards->data;
        $default_card = $this->format_customer_action->getDefaultCard($cards, $customer);
        return [
            'id' => $customer->id,
            'default_card' => [
                'id' => $default_card[0]['id'],
                'card_number' =>  "**** **** **** {$default_card[0]['last4']}",
                'brand' =>  $default_card[0]['brand'],
                'exp_year' =>  $default_card[0]['exp_year'],
                'exp_month' =>  $default_card[0]['exp_month'],
                'name' =>  $default_card[0]['name'],
            ]
        ];
    }

    public function store($request, User $user)
    {
        $customer = Customer::create([
            'card' => $request->payjp_token,
            'description' => "userId: {$user->id}",
        ]);
        return $customer->id;
    }

    public function update($request)
    {
        $customer = Customer::retrieve($request->payjp_customer_id);
        $customer->default_card = $request->card_id;
        return $customer->save();
    }
}
