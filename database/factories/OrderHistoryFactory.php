<?php

namespace Database\Factories;

use App\Models\Coupon;
use App\Models\OrderDestination;
use App\Models\OrderProduct;
use App\Models\OrderUser;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids  = User::pluck('id')->all();
        // $order_product_ids = OrderProduct::pluck('id')->all();
        $order_destination_ids = OrderDestination::pluck('id')->all();
        $coupon_ids = Coupon::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            // 'order_product_id' => fake()->randomElement($order_product_ids),
            'order_destination_id' => fake()->randomElement($order_destination_ids),
            'delivery_time' => fake()->numberBetween(1,8),
            'purchase_amount' => fake()->numberBetween(100, 10000000),
            'status' => fake()->numberBetween(1, 4),
            'payment_method' => fake()->numberBetween(1, 5),
            'shipping_fee' => fake()->numberBetween(0, 1000),
            'coupon_id' => fake()->randomElement($coupon_ids),
            'tax' => fake()->numberBetween(1, 50),
        ];
    }
}
