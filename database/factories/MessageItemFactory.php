<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MessageItem>
 */
class MessageItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $message_ids = Message::all()->pluck('id');

        return [
            'message_id' => fake()->randomElement($message_ids),
            'text' => fake()->realText(30, 5),
            'image_path' => null,
            'video_path' => null,
        ];
    }
}
