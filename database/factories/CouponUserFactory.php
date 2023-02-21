<?php

namespace Database\Factories;

use App\Models\Coupon;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CouponUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        /* 中間テーブルに紐付けるIDを取得する*/
        $user_ids  = User::pluck('id')->all();
        $coupon_ids  = Coupon::pluck('id')->all();
        
        return [
            'coupon_id' => fake()->randomElement($coupon_ids),
            'user_id' => fake()->randomElement($user_ids)
        ];
    }
}
