<?php

namespace App\Services\liff\cart;

use App\Models\Cart;
use App\Models\Product;
use App\Services\api\line\verify\VerifyService;
use App\Services\management\product\SearchProductAction;

class CartService
{
    private $verify_service;
    private $format_cart_action;

    public function __construct(VerifyService $verify_service, FormatCartAction $format_cart_action)
    {
        $this->verify_service = $verify_service;
        $this->format_cart_action = $format_cart_action;
    }

    public function index() 
    {
        return Cart::with('product.productImages')->where('user_id', 101)->get();
    }

    public function store($request)
    {
        # IDトークンを検証し、ユーザー情報の取得
        $response = $this->verify_service->verifyIdToken($request->token);
        $data = $request->only(['product_id', 'quantity']);
        $merged_cart = $this->format_cart_action->mergeUserIdToArray($response['sub'], $data);
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
