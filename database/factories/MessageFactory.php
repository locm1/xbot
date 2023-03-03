<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = '[' .fake()->lastName() .' ' .fake()->firstName() .']の配信';
        return [
            'title' => $title,
            'is_undisclosed' => 0,
        ];
    }
}
