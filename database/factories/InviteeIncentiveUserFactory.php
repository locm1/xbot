<?php

namespace Database\Factories;

use App\Models\InviteIncentive;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InviteeIncentiveUser>
 */
class InviteeIncentiveUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $invite_incentive_ids = InviteIncentive::all()->pluck('id');
        $user_ids = User::all()->pluck('id')->toArray();
        $is_issued = fake()->randomElement([0, 1]);
        $timestamp = fake()->unixTime();
        $date = $is_issued == 1 ? date('Y-m-d H:i:s', $timestamp) : null;

        return [
            'invite_incentive_id' => fake()->randomElement($invite_incentive_ids),
            'user_id' => fake()->randomElement($user_ids),
            'is_issued' => $is_issued,
            'usage_status' => fake()->randomElement([1, 2]),
            'issued_at' => $date,
        ];
    }
}
