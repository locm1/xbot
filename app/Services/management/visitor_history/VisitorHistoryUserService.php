<?php

namespace App\Services\management\visitor_history;

use App\Models\VisitorHistory;

class VisitorHistoryUserService
{

    public function getUserByVisitorHistory(VisitorHistory $visitor_history) 
    {
        return VisitorHistory::find($visitor_history->id)->user;
    }
}
