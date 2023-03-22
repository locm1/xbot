<?php

namespace App\Http\Controllers\api\liff\specific_trades;

use App\Http\Controllers\Controller;
use App\Services\management\specific_trade\SpecificTradeService;
use Illuminate\Http\Request;

class SpecificTradeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  SpecificTradeService  $specific_trade_service
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SpecificTradeService $specific_trade_service)
    {
        $specific = $specific_trade_service->index();
        return response()->json(['specific_trades' => $specific], 200);
    }
}
