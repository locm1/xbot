<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $products = file(database_path('resources/products.txt'));

        return [
            'name' => fake()->randomElement($products),
            'product_category_id' => fake()->numberBetween(1, 10),
            'stock_quantity' => fake()->randomNumber(3),
            'tax_rate' => 10,
            'price' => fake()->randomNumber(5),
            'overview' => fake()->sentences(2, true),
            'is_undisclosed' => 0,
            'is_unlimited' => 0,
            'display_order' => fake()->randomFloat(null, 1, 200)
        ];
    }
}
