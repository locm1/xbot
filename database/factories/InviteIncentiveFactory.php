<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InviteIncentive>
 */
class InviteIncentiveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => 'クーポン' . fake()->firstKanaName(),
            'inviter_timing' => fake()->numberBetween(1, 4),
            'inviter_format' => 1,
            'inviter_title' => fake()->realText(20, 5),
            'inviter_content' => fake()->realText(30, 5),
            'invitee_timing' => fake()->numberBetween(1, 4),
            'invitee_format' => 1,
            'invitee_title' => fake()->realText(20, 5),
            'invitee_content' => fake()->realText(30, 5),
        ];
    }
}
