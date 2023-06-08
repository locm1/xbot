<?php

namespace App\Http\Controllers\api\liff\event;

use App\Http\Controllers\Controller;
use App\Http\Requests\liff\event\StoreEventRequest;
use App\Models\Event;
use App\Models\User;
use App\Services\liff\event\EventReservationService;
use App\Services\liff\event\EventService;
use Illuminate\Http\Request;

class EventReservationController extends Controller
{
    private $service;

    public function __construct(EventReservationService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $events = $this->service->index($user);
        return response()->json(['events' => $events], 200);
    }

    /**
     * Handle the incoming request.
     *
     * @param  App\Http\Requests\liff\event\StoreEventRequest  $request
     * @param  Event  $event
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEventRequest $request, User $user, Event $event)
    {
        $Event = $this->service->store($user, $event);
        return response()->json(['event' => $Event], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User $user
     * @param  Event $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user, Event $event)
    {
        $this->service->destroy($user, $event);
        return response()->json([], 204);
    }
}
