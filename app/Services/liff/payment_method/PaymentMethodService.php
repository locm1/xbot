<?php

namespace App\Services\liff\payment_method;

use App\Models\Cart;
use App\Models\OrderPaymentMethod;
use App\Models\Product;
use App\Models\User;
use App\Services\common\MergeArrayUtility;

class PaymentMethodService
{
    public function index(User $user)
    {
        return $user->orderPaymentMethod;
    }

    public function store($request, User $user)
    {
        $data = $request->only(['payment_method']);
        $merged_payment_method = MergeArrayUtility::mergeUserIdToArray($user->id, $data);
        return OrderPaymentMethod::create($merged_payment_method);
    }

    public function update($request, OrderPaymentMethod $payment)
    {
        $data = $request->only(['payment_method']);
        return $payment->update($data);
    }
}
