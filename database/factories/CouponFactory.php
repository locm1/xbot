<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => 'クーポン' . fake()->firstKanaName(),
            'upper_limit' => fake()->numberBetween(0, 1000),
            'discount_price' => fake()->numberBetween(1, 80),
            'code' => fake()->unique()->hexColor()
        ];
    }
}
