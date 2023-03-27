<?php

namespace App\Services\api\payjp\charge;

use Payjp\Payjp;
use Payjp\Charge;
use Payjp\Error\Card;
use Payjp\Error\InvalidRequest;
use Illuminate\Support\Facades\DB;

class ChargeService
{
    private $secret_key;

    public function __construct() {
        $this->secret_key = config('api_key.PAYJP_SECRET_KEY');
        # シークレットキーを設定
        Payjp::setApiKey($this->secret_key);
    }

    public function charge($charge)
    {
        try {
            $charge = Charge::create([
                'customer' => $charge['payjp_customer_id'],
                'amount' => $charge['purchase_amount'],
                'currency' => 'jpy'
            ]);
        } catch (Card $e) {
            throw $e;
        } catch (InvalidRequest $e) {
            throw $e;
        }
        return $charge->id;
    }

    public function refund($payment_id)
    {
        $charge = Charge::retrieve($payment_id);
        return $charge->refund();
    }
}
