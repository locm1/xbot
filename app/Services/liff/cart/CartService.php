<?php

namespace App\Services\liff\cart;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use App\Services\common\MergeArrayUtility;
use App\Services\liff\user\UserService;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\Log;

class CartService
{
    public function index($request, User $user) 
    {
        $related_products = array();
        $result_carts = array();
        
        $carts_by_user_id = Cart::where('user_id', $user->id);
        $carts = (isset($request->product_id)) ? $carts_by_user_id->where('product_id', $request->product_id) : $carts_by_user_id;

        $related_product_carts = $carts->with(['product.relatedProducts', 'product.productImages'])->get();
        foreach ($related_product_carts as $cart) {
            $related_products[] = $cart->product->relatedProducts->toArray();
            $result_carts[] = [
                'id' => $cart->id,
                'user_id' => $cart->user_id,
                'product_id' => $cart->product_id,
                'quantity' => $cart->quantity,
                'deleted_at' => $cart->deleted_at,
                'created_at' => $cart->created_at,
                'updated_at' => $cart->updated_at,
                'product' => [
                    'id' => $cart->product->id,
                    'price' => $cart->product->price,
                    'product_category_id' => $cart->product->product_category_id,
                    'name' => $cart->product->name,
                    'stock_quantity' => $cart->product->stock_quantity,
                    'product_images' => $cart->product->productImages,
                ]
            ];
        }

        return [
            'cart_items' => $result_carts,
            'related_products' => array_reduce($related_products, 'array_merge', [])
        ];
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
