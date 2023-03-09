<?php

namespace App\Services\management\greeting;

use App\Models\GreetingMessage;

class GreetingMessageService
{
    private $upsert_greeting_message_action;

    public function __construct(UpsertGreetingMessageAction $upsert_greeting_message_action)
    {
        $this->upsert_greeting_message_action = $upsert_greeting_message_action;
    }

    public function index() 
    {
        return GreetingMessage::all();
    }

    public function update($request, $method) 
    {
        $merged_greeting_messages = $this->upsert_greeting_message_action->updateFiles($request, $method);
        return GreetingMessage::upsert($merged_greeting_messages, ['id']);
    }


    public function destroy($request) 
    {
        $messages = GreetingMessage::whereIn('id', $request->ids);

        foreach ($messages->get() as $message) {
            if (isset($message->image_path)) {
                $this->upsert_greeting_message_action->deleteFile('greeting', $message->image_path);
            }

            if (isset($message->video_path)) {
                $this->upsert_greeting_message_action->deleteFile('video', $message->video_path);
            }
        }
        return $messages->delete();
    }

}
