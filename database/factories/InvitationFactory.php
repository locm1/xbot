<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $coupon_ids = Coupon::all()->pluck('id');
        return [
            'coupon_id' => fake()->randomElement($coupon_ids),
            'privilege_detail' => fake()->realTextBetween(1, 20),
        ];
    }
}
