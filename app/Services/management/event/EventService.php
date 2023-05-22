<?php

namespace App\Services\management\event;

use App\Models\Event;

class EventService
{

    public function index()
    {
        return Event::with('users')->orderBy('created_at', 'desc')->paginate(10);
    }

    public function getEventUsersById($event_calendar)
    {
        return Event::find($event_calendar->id)->users;
    }
}
