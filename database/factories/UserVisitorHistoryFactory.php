<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VisitorHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UserVisitorHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids  = User::pluck('id')->all();
        $visitor_history_id = VisitorHistory::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            'visitor_history_id' => fake()->randomElement($visitor_history_id),
        ];
    }
}
