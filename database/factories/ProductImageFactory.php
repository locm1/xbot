<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $img_path = str_replace('public', '', fake()->file('resources/assets/img/products', 'public/images/test_img/products'));

        return [
            'product_id' => fake()->numberBetween(1, 50),
            'image_path' => $img_path,
        ];
    }
}
