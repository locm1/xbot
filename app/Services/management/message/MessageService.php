<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Services\management\message\UpsertMessageItemAction;
use Illuminate\Support\Facades\DB;

class MessageService
{
    private $search_message_action;
    private $upsert_message_item_action;

    public function __construct(SearchMessageAction $search_message_action, UpsertMessageItemAction $upsert_message_item_action)
    {
        $this->search_message_action = $search_message_action;
        $this->upsert_message_item_action = $upsert_message_item_action;
    }

    public function index($request) 
    {
        if (!empty($request->title)) {
            return $this->search_message_action->search($request);
        }

        if (!empty($request->count)) {
            return Message::all();
        }

        return Message::orderBy('id', 'desc')->paginate(10);
    }


    public function store($request) 
    {
        return DB::transaction(function () use ($request) {
            $data = $request->only(['title', 'is_undisclosed']);
            $message = Message::create($data);

            return $this->upsert_message_item_action->updateFiles($request, $message, 'store');
        });
    }


    public function show(Message $message) 
    {
        return $message;
    }


    public function update($request, Message $message, $method) 
    {
        return DB::transaction(function () use ($request, $message, $method) {
            $data = $request->only(['title', 'is_undisclosed']);
            $message->update($data);

            return $this->upsert_message_item_action->updateFiles($request, $message, $method);
        });
    }


    public function destroy(Message $message) 
    {
        return $message->delete();
    }

}
