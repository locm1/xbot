<?php
namespace App\Services\liff\event_history;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class EventHistoryService 
{

    public function index(User $user): Collection
    {
        $delete_keys = ['created_at', 'deadline', 'deleted_at', 'is_unlimited', 'pivot', 'remaining', 'updated_at'];

        $events = $user->events->groupBy(function ($event) {
            return Carbon::parse($event->start_date)->format('Y-m-d');
        })->map(function ($item) use ($delete_keys) {
            return $item->map(function ($event) use ($delete_keys) {
                $event_data = collect($event)->except($delete_keys)->all();
                $event_data['from'] = Carbon::parse($event->start_date)->format('H:i');
                $event_data['to'] = Carbon::parse($event->end_date)->format('H:i');
                return $event_data;
            });
        });

        return $events;
    }
}