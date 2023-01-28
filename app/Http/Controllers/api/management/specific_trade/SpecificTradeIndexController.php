<?php

namespace App\Http\Controllers\api\management\specific_trade;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\management\specific_trade\SpecificTradeService;

class SpecificTradeIndexController extends Controller
{
    private $specific_trade_service;

    public function __construct(SpecificTradeService $specific_trade_service) {
        $this->specific_trade_service = $specific_trade_service;
    }
    
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $specific = $this->specific_trade_service->index();
        return response()->json(['specific_trades' => $specific], 200);
    }
}
