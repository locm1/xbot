<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GreetingMessage>
 */
class GreetingMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        Storage::disk('public')->makeDirectory('greeting');
        $type = fake()->numberBetween(1, 2);

        if ($type == 2) {
            $img_path = str_replace('storage/app/public/greeting', '/storage/greeting', fake()->file('resources/assets/img/products', 'storage/app/public/greeting'));
        } else {
            $img_path = null;
        }

        return [
            'type' => $type,
            'text' => $type == 1 ? fake()->realText(30, 5) : null,
            'image_path' => $img_path,
            'video_path' => null,
        ];
    }
}
