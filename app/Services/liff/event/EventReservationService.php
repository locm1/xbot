<?php
namespace App\Services\liff\event;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventReservationService 
{

    public function index(User $user)
    {
        return $user->events;
    }

    public function store($request, Event $event)
    {
        return DB::transaction(function () use ($event, $request) {
            # 中間テーブルに保存
            $event->users()->attach($request->user_id);

            # イベントの残数を再計算（-1）
            $event->update(['remaining' => $event->remaining - 1]);
            return $event;
        });
    }
}