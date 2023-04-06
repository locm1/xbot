<?php

namespace Database\Factories;

use App\Models\InviteIncentive;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DefaultInviteIncentive>
 */
class DefaultInviteIncentiveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $invite_incentive_ids = InviteIncentive::all()->pluck('id');
        return [
            'invite_incentive_id' => fake()->randomElement($invite_incentive_ids),
        ];
    }
}
