<?php

namespace App\Http\Controllers\api\liff\product_reservation;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\product_reservation\ProductReservationService;
use Illuminate\Http\Request;

class ProductReservationController extends Controller
{
    private $reservation_service;

    public function __construct(ProductReservationService $reservation_service)
    {
        $this->reservation_service = $reservation_service;
    }

    /**
     * Display a listing of the resource.
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $product_reservations = $this->reservation_service->index($request, $user);
        return response()->json(['product_reservations' => $product_reservations], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $product_reservation = $this->reservation_service->store($request, $user);
        return response()->json(['product_reservation' => $product_reservation], 200);
    }
}
