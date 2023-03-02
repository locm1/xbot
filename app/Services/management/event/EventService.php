<?php

namespace App\Services\management\event;

use App\Models\Event;

class EventService
{

    public function index()
    {
        return Event::with('users')->paginate(20);
    }

    public function getEventUsersById($event_calendar)
    {
        return Event::find($event_calendar->id)->users;
    }
}
