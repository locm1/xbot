<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpecificTrade;
use App\Http\Requests\admin\setting\CreateSpecificTradeRequest;
use App\Http\Requests\admin\setting\UpdateSpecificTradeRequest;
use App\Services\setting\SpecificTradeService;

class SpecificTradeController extends Controller
{
    private $specific_trade_service;

    public function __construct(SpecificTradeService $specific_trade_service) {
        $this->specific_trade_service = $specific_trade_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $specific = $this->specific_trade_service->getAllSpecificTrades();
        return response()->json(['specific' => $specific], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateSpecificTradeRequest $request)
    {
        //
	$specific = $this->specific_trade_service->createSpecificTrade($request->data);
        return response()->json(['specific' => $specific], 201);
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
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSpecificTradeRequest $request)
    {
        //
	$specific = $this->specific_trade_service->createSpecificTrade($request->data);
        return response()->json(['specific' => $specific], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

