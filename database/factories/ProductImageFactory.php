<?php

namespace Database\Factories;

use App\Models\Product;
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
        $product_ids = Product::pluck('id')->all();

        return [
            'product_id' => fake()->randomElement($product_ids),
            'image_path' => $img_path,
            'display_order' => fake()->numberBetween(1,10)
        ];
    }
}
