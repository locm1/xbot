<?php

namespace App\Services\api\payjp\card;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Payjp\Payjp;
use Payjp\Customer;
use Illuminate\Support\Facades\DB;

class CardService
{
    private $secret_key;

    public function __construct() {
        $this->secret_key = config('api_key.PAYJP_SECRET_KEY');
    }

    public function index($request)
    {
        $cards = array();
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);

        $card_data = Customer::retrieve($request->payjp_customer_id)->cards->data;
        
        foreach ($card_data as $card) {
            $cards[] = [
                'id' => $card->id,
                'card_number' =>  "**** **** **** {$card->last4}",
                'brand' =>  $card->brand,
                'exp_year' =>  $card->exp_year,
                'exp_month' =>  $card->exp_month,
                'name' =>  $card->name,
            ];
        }
        return $cards;
    }

    public function store($request)
    {
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);

        $customer = Customer::retrieve($request->payjp_customer_id);
        return $customer->cards->create([
            'card' => $request->payjp_token,
        ]);
    }

    public function show($request, $card)
    {
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);

        $customer = Customer::retrieve($request->payjp_customer_id);
        $customer_card = $customer->cards->retrieve($card);
        return [
            'id' => $customer_card->id,
            'card_number' =>  "**** **** **** {$customer_card->last4}",
            'brand' =>  $customer_card->brand,
            'exp_year' =>  $customer_card->exp_year,
            'exp_month' =>  $customer_card->exp_month,
            'name' =>  $customer_card->name,
        ];
    }
}
