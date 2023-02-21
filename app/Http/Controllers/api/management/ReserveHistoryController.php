<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\reserve_history\UpdateReserveHistoryRequest;
use App\Models\ReserveHistory;
use App\Services\management\reserve_history\ReserveHistoryService;
use Illuminate\Http\Request;

class ReserveHistoryController extends Controller
{
    private $reserve_history_service;

    public function __construct(ReserveHistoryService $reserve_history_service)
    {
        $this->reserve_history_service = $reserve_history_service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reserve_histories = $this->reserve_history_service->index();
        return response()->json(['reserve_histories' => $reserve_histories], 200);
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
     * @param  UpdateReserveHistoryRequest  $request
     * @param  ReserveHistory  $reserve_history
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReserveHistoryRequest $request, ReserveHistory $reserve_history)
    {
        $reserve_history = $this->reserve_history_service->update($request, $reserve_history);
        return response()->json(['reserve_history' => $reserve_history], 200);
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
