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
        $events = Event::whereYear('created_at', $request->year)
            ->whereMonth('created_at', $request->month)
            ->get()->groupBy(function ($event) {
            return Carbon::parse($event->created_at)->format('Y-m-d');
        });
        return $events;
    }
}