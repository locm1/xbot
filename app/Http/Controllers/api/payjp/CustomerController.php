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
     * Store a newly created resource in storage.
     *
     * @param  StoreCartRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $customer_id = $this->customer_service->store($request, $user);
        return response()->json(['customer_id' => $customer_id], 200);
    }
}
