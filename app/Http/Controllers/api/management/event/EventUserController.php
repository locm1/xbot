<?php

namespace App\Http\Controllers\api\management\event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Services\management\event\EventService;
use App\Services\management\event\EventUserService;

class EventUserController extends Controller
{
    private $service;
    private $event_service;

    public function __construct(EventUserService $service, EventService $event_service)
    {
        $this->service = $service;
        $this->event_service = $event_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $event_users = $this->service->index();
        return response()->json(['event_users' => $event_users], 200);
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        $event_users = $this->event_service->getEventUsersById($event);
        return response()->json(['event_users' => $event_users], 200);
    }
}
