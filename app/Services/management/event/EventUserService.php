<?php

namespace App\Services\management\event;

use App\Models\Event;
use App\Models\EventUser;

class EventUserService
{

    public function index()
    {
        return EventUser::with(['user', 'event'])->orderBy('created_at', 'desc')->paginate(10);
    }
}
