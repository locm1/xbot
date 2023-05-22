<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'login_id' => fake()->word(),
            'name' => fake()->name(),
            'role' => fake()->numberBetween(1, 3),
            'password' => fake()->sha256(),
        ];
    }
}
