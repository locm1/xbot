<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpecificTrade;
use App\Http\Requests\management\specific_trade\CreateSpecificTradeRequest;
use App\Http\Requests\management\specific_trade\UpdateSpecificTradeRequest;
use App\Services\management\specific_trade\SpecificTradeService;

class SpecificTradeController extends Controller
{
    private $specific_trade_service;

    public function __construct(SpecificTradeService $specific_trade_service) {
        $this->specific_trade_service = $specific_trade_service;
    }

    public function index()
    {
        $specific = $this->specific_trade_service->index();
        return response()->json(['specific_trades' => $specific], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $specific = $this->specific_trade_service->store($request);
        return response()->json(['specific' => $specific], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(SpecificTrade $specific_trade)
    {
        $this->specific_trade_service->destroy($specific_trade);
        return response()->json([], 204);
    }
}

