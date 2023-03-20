<?php

namespace App\Services\liff\cart;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use App\Services\common\MergeArrayUtility;
use App\Services\liff\user\UserService;
use App\Services\management\product\SearchProductAction;

class CartService
{
    public function index($request, User $user) 
    {
        if (isset($request->product_id)) {
            return Cart::with('product.productImages')->where('user_id', $user->id)->where('product_id', $request->product_id)->get();
        }
        return Cart::with('product.productImages')->where('user_id', $user->id)->get();
    }

    public function store($request, User $user)
    {
        $data = $request->only(['product_id', 'quantity']);
        $merged_cart = MergeArrayUtility::mergeUserIdToArray($user->id, $data);
        // # すでにカートの中に同じ商品があれば、+1するだけ
        return Cart::create($merged_cart);
    }

    public function update($request, Cart $cart)
    {
        $data = $request->only(['quantity']);
        return $cart->update($data);
    }

    public function destroy(Cart $cart) 
    {
        return $cart->delete();
    }
}
