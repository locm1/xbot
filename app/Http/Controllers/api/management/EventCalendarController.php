<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\event_calendar\UpdateEventCalendarRequest;
use App\Models\Event;
use App\Services\event_calendar\EventCalendarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventCalendarController extends Controller
{
    private $event_calendar_service;

    public function __construct(EventCalendarService $event_calendar_service) {
        $this->event_calendar_service = $event_calendar_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $event_calendars = $this->event_calendar_service->index();
        return response()->json(['events' => $event_calendars], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UpdateEventCalendarRequest $request)
    {
        $create_data = $this->event_calendar_service->store($request);
        return response()->json(['event' => $create_data], 200);
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
     * @return JsonResource
     */
    public function update(UpdateEventCalendarRequest $request, $id): JsonResponse
    {
        $update_data = $this->event_calendar_service->update($request, $id);
        return response()->json(['event' => $update_data], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->event_calendar_service->destroy($id);
    }
}
