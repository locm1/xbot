<?php

namespace App\Http\Controllers\api\payjp;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\api\payjp\customer\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    private $customer_service;

    public function __construct(CustomerService $customer_service)
    {
        $this->customer_service = $customer_service;
    }

    /**
     * Display the specified resource.
     *
     * @param  Request  $request
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, $customer_id)
    {
        $customer = $this->customer_service->show($customer_id);
        return response()->json(['customer' => $customer], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCartRequest  $request
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $customer_id = $this->customer_service->store($request, $user);
        return response()->json(['customer_id' => $customer_id], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCartRequest  $request
     * @param  Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $customer = $this->customer_service->update($request);
        return response()->json(['customer' => $customer], 200);
    }
}
