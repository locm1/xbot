<?php

namespace App\Http\Controllers\api\liff\cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\cart\StoreCartRequest;
use App\Http\Requests\liff\cart\UpdateCartRequest;
use App\Models\Cart;
use App\Services\liff\cart\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private $cart_service;

    public function __construct(CartService $cart_service)
    {
        $this->cart_service = $cart_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $carts = $this->cart_service->index($request);
        return response()->json(['carts' => $carts], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCartRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCartRequest $request)
    {
        $cart = $this->cart_service->store($request);
        return response()->json(['cart' => $cart], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCartRequest  $request
     * @param  Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        $cart = $this->cart_service->update($request, $cart);
        return response()->json(['cart' => $cart], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Cart $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        $this->cart_service->destroy($cart);
        return response()->json([], 204);
    }
}
