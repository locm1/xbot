<?php

namespace Database\Factories;

use App\Models\OrderHistory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderUserFactory extends Factory
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
            // 'order_history_id' => fake()->randomElement($order_history_ids),
            'user_id' => fake()->randomElement($user_ids),
            'is_selected' => fake()->numberBetween(0, 1)
        ];
    }
}
