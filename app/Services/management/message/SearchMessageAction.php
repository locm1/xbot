<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Models\MessageItem;
use App\Services\management\message\UpsertMessageItemAction;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SearchMessageAction
{
    public function search($request)
    {
        $query = Message::query();

        if (isset($request->title)) {
            $query->where('title', 'like', "%{$request->title}%");
        }

        return $query->orderBy('id', 'desc')->paginate(10);
    }
}
