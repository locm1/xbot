<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Coupon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
        $coupon_ids = Coupon::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            "first_name" => fake()->firstName(),
            "first_name_kana" => fake()->firstKanaName(),
            "last_name" => fake()->lastName(),
            "last_name_kana" => fake()->lastKanaName(),
            'zipcode' => fake()->postcode(),
            'prefecture' => fake()->prefecture(),
            'city' => fake()->city(),
            'address' => fake()->streetAddress(),
            'building_name' => fake()->secondaryAddress(),
            'tel' => str_replace(array('-', 'ー', '−', '―', '‐'), '', fake()->phoneNumber()),
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
