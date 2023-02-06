<?php

namespace App\Services\event_calendar;

use App\Models\Event;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class EventCalendarService 
{

    public function index() 
    {
        $events = Event::all()->toArray();
        $keys = ['id', 'title', 'start', 'end', 'location', 'remaining', 'is_unlimited', 'color', 'deadline', 'deleted_at', 'created_at', 'updated_at'];
        
        foreach ($events as $event) {
            $formated_events[] = array_combine($keys, $event);
        }
        return $formated_events;
    }


    public function store($request) 
    {
        $data = $request->only(['title', 'start_date', 'end_date', 'location', 'remaining', 'is_unlimited']);
        return Event::create($data);
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
