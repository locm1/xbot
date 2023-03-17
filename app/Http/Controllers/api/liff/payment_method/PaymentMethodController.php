<?php

namespace App\Http\Controllers\api\liff\payment_method;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\payment_method\StorePaymentMethodRequest;
use App\Http\Requests\liff\payment_method\UpdatePaymentMethodRequest;
use App\Models\OrderPaymentMethod;
use App\Models\User;
use App\Services\liff\payment_method\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    private $payment_method_service;

    public function __construct(PaymentMethodService $payment_method_service)
    {
        $this->payment_method_service = $payment_method_service;
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $order_payment_methods = $this->payment_method_service->index($user);
        return response()->json(['order_payment_methods' => $order_payment_methods], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreOrderDestinationRequest  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(StorePaymentMethodRequest $request, User $user)
    {
        $order_payment_method = $this->payment_method_service->store($request, $user);
        return response()->json(['order_payment_method' => $order_payment_method], 200);
    }

    /**
     * Display the specified resource.
     * @param  UpdatePaymentMethodRequest  $request
     * @param  User $user
     * @param  OrderPaymentMethod $payment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePaymentMethodRequest $request, User $user, OrderPaymentMethod $payment)
    {
        $order_payment_method = $this->payment_method_service->update($request, $payment);
        return response()->json(['order_payment_method' => $order_payment_method], 200);
    }
}
