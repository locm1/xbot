<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvitationUser>
 */
class InvitationUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $invitation_ids = Invitation::all()->pluck('id');
        $user_ids = User::all()->pluck('id');
        return [
            'user_id' => fake()->randomElement($user_ids),
            'invitation_id' => fake()->randomElement($invitation_ids),
            'usage_status' => fake()->randomElement([1, 2]),
        ];
    }
}
