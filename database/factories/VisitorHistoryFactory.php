<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitorHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids  = User::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            'memo' => fake()->paragraph()
        ];
    }
}
