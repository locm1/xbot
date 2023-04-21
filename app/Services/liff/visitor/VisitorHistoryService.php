<?php

namespace App\Services\liff\visitor;

use App\Models\User;
use App\Models\VisitorHistory;
use App\Services\api\line\invite\InviteService;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class VisitorHistoryService
{
    public function store(int $user_id) 
    {
        # インセンティブ発行
        if (VisitorHistory::where('user_id' , $user_id)->count() === 0) {
            $issued = (new InviteService)($user_id, 3);
        }
        return VisitorHistory::create(['user_id' => $user_id]);
    }
}
