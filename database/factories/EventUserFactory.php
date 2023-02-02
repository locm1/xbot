<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventUser>
 */
class EventUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        /* 中間テーブルに紐付けるIDを取得する*/
        $user_ids  = User::pluck('id')->all();
        $event_ids  = Event::pluck('id')->all();
        
        return [
            'event_id' => fake()->randomElement($event_ids),
            'user_id' => fake()->randomElement($user_ids)
        ];
    }
}
