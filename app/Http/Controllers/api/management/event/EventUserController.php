<?php

namespace App\Http\Controllers\api\management\event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Services\management\event\EventService;

class EventUserController extends Controller
{

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(EventService $event_service, Event $event)
    {
        $event_users = $event_service->getEventUsersById($event);
        return response()->json(['event_users' => $event_users], 200);
    }
}
