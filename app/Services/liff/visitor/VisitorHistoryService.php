<?php

namespace App\Services\liff\visitor;

use App\Models\User;
use App\Models\VisitorHistory;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class VisitorHistoryService
{
    public function store(User $user) 
    {
        return VisitorHistory::create(['user_id' => $user->id]);
    }
}
