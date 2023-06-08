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

    public function store(User $user, Event $event)
    {
        return DB::transaction(function () use ($event, $user) {
            # 中間テーブルに保存
            $event->users()->attach($user->id);

            # イベントの残数を再計算（-1）
            if ($event->is_unlimited === 0) {
                $event->update(['remaining' => $event->remaining - 1]);
            }
            
            return $event;
        });
    }
}