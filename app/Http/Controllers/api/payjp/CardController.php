<?php

namespace App\Http\Controllers\api\payjp;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\api\payjp\customer\CardService;
use Illuminate\Http\Request;

class CardController extends Controller
{
    private $card_service;

    public function __construct(CardService $card_service)
    {
        $this->card_service = $card_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $cards = $this->card_service->index($request);
        return response()->json(['cards' => $cards], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCartRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        $card = $this->card_service->store($request, $user);
        return response()->json(['card' => $card], 200);
    }
}
