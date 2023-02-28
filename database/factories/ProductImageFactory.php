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
        $img_path = str_replace('storage/app/public/products', '/storage/products', fake()->file('resources/assets/img/products', 'storage/app/public/products'));
        $product_ids = Product::pluck('id')->all();

        return [
            'product_id' => fake()->randomElement($product_ids),
            'image_path' => $img_path,
        ];
    }
}
