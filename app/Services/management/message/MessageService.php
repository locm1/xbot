<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Services\management\AbstractManagementService;

class MessageService
{

    public function index() 
    {
        return Message::all();
    }


    public function store() 
    {
        //
    }


    public function show(Message $message) 
    {
        return $message;
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
