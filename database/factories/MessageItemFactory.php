<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
        Storage::disk('public')->makeDirectory('video');
        Storage::disk('public')->makeDirectory('message');
        
        $message_ids = Message::all()->pluck('id');
        $type = fake()->numberBetween(1, 2);
        $img_path = str_replace('storage/app/public/message', '/storage/message', fake()->file('resources/assets/img/products', 'storage/app/public/message'));

        return [
            'message_id' => fake()->randomElement($message_ids),
            'type' => $type,
            'text' => $type == 1 ? fake()->realText(30, 5) : null,
            'image_path' => $type == 2 ? $img_path : null,
            'video_path' => null,
        ];
    }
}
