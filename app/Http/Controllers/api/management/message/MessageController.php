<?php

namespace App\Http\Controllers\api\management\message;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\management\message\MessageService;
use App\Http\Requests\management\message\UpdateMessageRequest;
use Illuminate\Http\Request;
use App\Http\Requests\management\message\StoreMessageRequest;

class MessageController extends Controller
{

    private $message_service;

    public function __construct(MessageService $message_service)
    {
        $this->message_service = $message_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $messages = $this->message_service->index($request);
        return response()->json(['messages' => $messages], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMessageRequest $request)
    {
        $message = $this->message_service->store($request);
        return response()->json(['message' => $message], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Message $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        $message = $this->message_service->show($message);
        return response()->json(['message' => $message], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateMessageRequest  $request
     * @param  Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        $message = $this->message_service->update($request, $message);
        return response()->json(['message' => $message], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        $this->message_service->destroy($message);
        return response()->json([], 204);
    }
}
