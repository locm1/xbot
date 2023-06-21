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

        //すでに1日の来店回数（1回）を超えていたらエラー
        if ($this->checkIfVisitedToday($user_id)) {
            return abort(512, '来店失敗');
        }

        return VisitorHistory::create(['user_id' => $user_id]);
    }

    public function checkIfVisitedToday(int $user_id): bool 
    {
        $today = date('y-m-d');
        $visitor_histories = VisitorHistory::where('user_id', $user_id)->whereDate('created_at', $today);
        return $visitor_histories->exists();
    }
}
