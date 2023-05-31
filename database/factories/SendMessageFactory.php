<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SendMessage>
 */
class SendMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $message_ids  = Message::pluck('id')->all();

        return [
            'message_id' => fake()->randomElement($message_ids),
            'status' => fake()->numberBetween(0, 1),
            'search_json' => json_encode([]),
        ];
    }
}
