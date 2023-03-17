<?php

namespace App\Services\liff\cart;

use App\Models\Cart;
use App\Models\Product;
use App\Services\api\line\verify\VerifyService;
use App\Services\common\MergeArrayUtility;
use App\Services\liff\user\UserService;
use App\Services\management\product\SearchProductAction;

class CartService
{
    private $user_service;

    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    public function index($request) 
    {
        $user = $this->user_service->getUser($request);
        return Cart::with('product.productImages')->where('user_id', $user->id)->get();
    }

    public function store($request)
    {
        $data = $request->only(['product_id', 'quantity']);
        $user = $this->user_service->getUser($request);
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
