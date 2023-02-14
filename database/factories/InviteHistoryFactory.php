<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class InviteHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->all();
        return [
            'inviter_user_id' => fake()->randomElement($user_ids),
            'invitee_user_id' => fake()->unique()->randomElement($user_ids),
        ];
    }
}
