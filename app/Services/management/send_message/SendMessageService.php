<?php

namespace App\Services\management\send_message;

use App\Models\SendMessage;
use App\Services\management\AbstractManagementService;

class SendMessageService
{

    public function index() 
    {
        $SendMessage = SendMessage::with(['sendMessageUsers', 'message'])->get();
        $data = [];
        foreach ($SendMessage as $k => $v) {
            $data[] = [
                'id' => $v->id,
                'status' => $v->status,
                'templateName' => $v->message->title,
                'sendDate' => $v->updated_at,
                'targetCount' => $v->sendMessageUsers->count(),
            ];
        }
        return $data;
    }


    public function store() 
    {
        //
    }


    public function show($SendMessage) 
    {
        
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
