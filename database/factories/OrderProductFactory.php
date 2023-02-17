<?php

namespace Database\Factories;

use App\Models\OrderHistory;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $product_ids = Product::pluck('id')->all();
        $order_history_ids = OrderHistory::pluck('id')->all();

        return [
            'product_id' => fake()->randomElement($product_ids),
            'quantity' => fake()->numberBetween(1, 100000),
            'name' => "商品名" . fake()->firstKanaName(),
            'price' => fake()->numberBetween(100, 1000000),
            'order_history_id' => fake()->randomElement($order_history_ids),
        ];
    }
}
