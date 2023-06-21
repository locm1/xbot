<?php

namespace App\Services\management\event;

use App\Models\Event;
use App\Models\EventUser;

class EventUserService
{

    public function index()
    {
        return EventUser::with(['user', 'event'])->orderBy('event_user.id', 'desc')->paginate(10);
    }
}
