<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\greeting\StoreGreetingMessageRequest;
use App\Services\management\greeting\GreetingMessageService;
use App\Http\Requests\management\greeting\UpdateGreetingMessageRequest;
use Illuminate\Http\Request;

class GreetingMessageController extends Controller
{
    private $greeting_message_service;

    public function __construct(GreetingMessageService $greeting_message_service)
    {
        $this->greeting_message_service = $greeting_message_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $greeting_messages = $this->greeting_message_service->index();
        return response()->json(['greeting_messages' => $greeting_messages], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGreetingMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGreetingMessageRequest $request)
    {
        $greeting_messages = $this->greeting_message_service->update($request, 'store');
        return response()->json(['greeting_messages' => $greeting_messages], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGreetingMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $greeting_messages = $this->greeting_message_service->update($request, 'update');
        return response()->json(['greeting_messages' => $greeting_messages], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->greeting_message_service->destroy($request);
        return response()->json([], 204);
    }
}
