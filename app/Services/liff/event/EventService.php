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

    public function index($request): Collection
    {
        $events = Event::whereYear('start_date', $request->year)
            ->whereMonth('start_date', $request->month)
            ->get()->groupBy(function ($event) {
            return Carbon::parse($event->start_date)->format('Y-m-d');
        });
        return $events;
    }
}