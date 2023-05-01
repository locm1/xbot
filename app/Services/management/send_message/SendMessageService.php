<?php

namespace App\Services\management\send_message;

use App\Models\SendMessage;
use App\Services\management\AbstractManagementService;

class SendMessageService
{

    public function index() 
    {
        $send_messages = SendMessage::with(['sendMessageUsers', 'message'])->paginate(10);
        $data = [];
        foreach ($send_messages as $k => $v) {
            $data[] = [
                'id' => $v->id,
                'status' => $v->status,
                'templateName' => $v->message->title,
                'sendDate' => $v->updated_at,
                'targetCount' => $v->sendMessageUsers->count(),
            ];
        }
        return [
            'current_page' => $send_messages->currentPage(),
            'data' => $data,
            'per_page' => $send_messages->perPage(),
            'from' => $send_messages->firstItem(),
            'to' => $send_messages->lastItem(),
            'total' => $send_messages->total(),
            'last_page' => $send_messages->lastPage()
        ];
    }


    public function store() 
    {
        //
    }


    public function show(SendMessage $send_message) 
    {
        return $send_message->with(['sendMessageUsers.user', 'message'])->find($send_message->id);
    }


    public function update() 
    {
        //
    }


    public function destroy() 
    {
        //
    }

}
