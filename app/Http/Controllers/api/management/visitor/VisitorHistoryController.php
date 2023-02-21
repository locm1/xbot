<?php

namespace App\Http\Controllers\api\management\visitor;

use App\Http\Controllers\Controller;
use App\Models\VisitorHistory;
use Illuminate\Http\Request;
use App\Http\Requests\management\visitor_history\UpdateVisitorHistoryRequest;
use App\Services\management\visitor_history\VisitorHistoryService;

class VisitorHistoryController extends Controller
{
    private $history_service;

    public function __construct(VisitorHistoryService $history_service) {
        $this->history_service = $history_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visitors = $this->history_service->index();
        return response()->json(['visitor_histories' => $visitors], 200);
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
     * @param  VisitorHistory $visitor_history
     * @return \Illuminate\Http\Response
     */
    public function show(VisitorHistory $visitor_history)
    {
        $visitor_history = $this->history_service->show($visitor_history);
        return response()->json(['visitor_history' => $visitor_history], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateVisitorHistoryRequest  $request
     * @param  VisitorHistory  $visitor_history
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVisitorHistoryRequest $request, VisitorHistory $visitor_history)
    {
        $visitor_history = $this->history_service->update($request, $visitor_history);
        return response()->json(['visitor_history' => $visitor_history], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  VisitorHistory $visitor_history
     * @return \Illuminate\Http\Response
     */
    public function destroy(VisitorHistory $visitor_history)
    {
        $this->history_service->destroy($visitor_history);
        return response()->json([], 204);
    }
}
