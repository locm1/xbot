<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categories = file(database_path('resources/categories.txt'), FILE_IGNORE_NEW_LINES);

        return [
            'name' => fake()->randomElement($categories),
            'color' => fake()->hexColor(),
            'content' => fake()->sentences(2, true),
            'is_undisclosed' => 0,
            'display_order' => fake()->randomFloat(null, 1, 200)
        ];
    }
}
