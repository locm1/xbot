<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReserveHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->all();
        $product_ids = Product::pluck('id')->all();
        return [
            'user_id' => fake()->randomElement($user_ids),
            'product_id' => fake()->randomElement($product_ids),
            'quantity' => fake()->numberBetween(1, 100),
            'deadline' => fake()->dateTime(),
            'status' => fake()->numberBetween(1,5)
        ];
    }
}
