<?php

namespace Database\Factories;

use App\Models\Coupon;
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
        $order_user_ids = OrderUser::pluck('id')->all();
        $coupon_ids = Coupon::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            // 'order_product_id' => fake()->randomElement($order_product_ids),
            'order_user_id' => fake()->randomElement($order_user_ids),
            'delivery_time' => fake()->dateTime(),
            'purchase_amount' => fake()->numberBetween(100, 10000000),
            'status' => fake()->numberBetween(0, 5),
            'payment_method' => fake()->numberBetween(0,5),
            'shipping_fee' => fake()->numberBetween(0, 1000),
            'coupon_code_id' => fake()->randomElement($coupon_ids),
            'tax' => fake()->numberBetween(1, 50),
        ];
    }
}
