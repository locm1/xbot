<?php

namespace App\Services\management\event_calendar;

use App\Models\Event;
use App\Services\management\AbstractManagementService;
use DateTime;
use Illuminate\Database\Eloquent\Model;

class EventCalendarService 
{

    public function index() 
    {
        $events = Event::all()->toArray();
        $keys = ['id', 'title', 'start', 'end', 'location', 'remaining', 'is_unlimited', 'deadline', 'deleted_at', 'created_at', 'updated_at'];
        
        foreach ($events as $event) {
            $formated_events[] = array_combine($keys, $event);
        }
        return $formated_events;
    }


    public function upsert($request, $id = null) 
    {
        // $data = $request->only(['title', 'start_date', 'end_date', 'start_time', 'end_time', 'location', 'remaining', 'is_unlimited', 'color']);
        $date1 = new DateTime($request->start_date);
        if ($request->end_date ?? false) {
            $date2 = new DateTime($request->end_date);
            $interval = $date1->diff($date2);
            $day_count = $interval->days;
        } else {
            $day_count = 0;
        }
        $data = [];
        for($i = 0; $i <= $day_count; $i++) {
            $date = date('Y-m-d', strtotime($date1->format('Y-m-d') . "+$i day"));
            $data[] = [
                'id' => $id,
                'title' => $request->title, 
                'start_date' => $date . ' ' . $request->start_time,
                'end_date' => $date. ' ' . $request->end_time ?? $request->start_time,
                'location' => $request->location,
                'remaining' => $request->remaining,
                'is_unlimited' => $request->is_unlimited,
            ];
        }
        Event::upsert($data, 'id');
        return $data;
    }


    public function show($request) 
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Model $event
     * @return array
     */
    public function update($request, $event_calendar): array
    {
        $data = $request->all();
        $event_calendar->update($data);
        return $data;
    }


    public function destroy($event_calendar) 
    {
        return $event_calendar->delete();
    }

}
