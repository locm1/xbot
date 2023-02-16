<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RelatedProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $flg = true;
        while ($flg) {
            $product_ids = Product::pluck('id')->all();
            $related_product_ids = Product::pluck('id')->all();
            $random_product_id = fake()->randomElement($product_ids);
            $random_related_product_id = fake()->randomElement($related_product_ids);
            if ($random_product_id !== $random_related_product_id) {
                $flg = false;
            }
        }
        return [
            'product_id' => $random_product_id,
            'related_product_id' => $random_related_product_id,
            'discount_price' => fake()->numberBetween(1, 10000),
        ];
    }
}
