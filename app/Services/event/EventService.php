<?php

namespace App\Services\event;

use App\Models\Event;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;

class EventService extends AbstractManagementService 
{

    public function index(): Collection
    {
        return Event::all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request)
    {
        //
    }


    public function show($request) 
    {
        //
    }


    public function update($request, $event) 
    {
        //
    }


    public function destroy($request) 
    {
        //
    }

}
