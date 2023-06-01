<?php

namespace Database\Factories;

use App\Models\SendMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SendMessageUser>
 */
class SendMessageUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $send_message_ids  = SendMessage::pluck('id')->all();
        $user_ids  = User::pluck('id')->all();

        return [
            'send_message_id' => fake()->randomElement($send_message_ids),
            'user_id' => fake()->randomElement($user_ids),
        ];
    }
}
