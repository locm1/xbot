<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Services\management\AbstractManagementService;

class MessageItemService
{

    public function getMessageItemsById(Message $message) 
    {
        return $message->messageItems;
    }


    public function store() 
    {
        //
    }


    public function update() 
    {
        //
    }

}
