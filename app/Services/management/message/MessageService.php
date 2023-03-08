<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Services\management\AbstractManagementService;

class MessageService
{
    private $search_message_action;

    public function __construct(SearchMessageAction $search_message_action)
    {
        $this->search_message_action = $search_message_action;
    }

    public function index($request) 
    {
        if (!empty($request->title)) {
            return $this->search_message_action->search($request);
        }
        return Message::orderBy('id', 'desc')->get();
    }


    public function store($request) 
    {
        $data = $request->only(['title', 'is_undisclosed']);
        return Message::create($data);
    }


    public function show(Message $message) 
    {
        return $message;
    }


    public function update($request, $message) 
    {
        $data = $request->only(['title', 'is_undisclosed']);
        return $message->update($data);
    }


    public function destroy(Message $message) 
    {
        return $message->delete();
    }

}