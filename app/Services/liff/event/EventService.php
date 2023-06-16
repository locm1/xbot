<?php
namespace App\Services\liff\event;

use App\Models\Event;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventService 
{

    public function index($request): array
    {
        $result_events = array();

        $events = Event::whereYear('start_date', $request->year)
            ->whereMonth('start_date', $request->month)
            ->get()->groupBy(function ($event) {
            return Carbon::parse($event->start_date)->format('Y-m-d');
        });

        foreach ($events as $key => $value) {
            if ($key >= date('Y-m-d')) {
                $result_events[$key] = $value;
            }
        }
        return $result_events;
    }

    public function show(Event $event) : Event
    {
        return $event;
    }
}