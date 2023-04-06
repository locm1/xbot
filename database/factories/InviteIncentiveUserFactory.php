<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\InviteIncentive;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InviteIncentiveUser>
 */
class InviteIncentiveUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $invite_incentive_ids = InviteIncentive::all()->pluck('id');
        $user_ids = User::all()->pluck('id');
        return [
            'user_id' => fake()->randomElement($user_ids),
            'invite_incentive_id' => fake()->randomElement($invite_incentive_ids),
            'usage_status' => fake()->randomElement([1, 2]),
        ];
    }
}
