<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $start_date = fake()->dateTimeThisMonth('+1 month');
        $end_date = fake()->dateTimeInInterval($start_date, '+3 days');

        return [
            'title' => fake()->realTextBetween(1, 50),
            'start_date' => $start_date,
            'end_date' => $end_date,
            'location' => fake()->streetName() . fake()->city() . fake()->streetAddress(),
            'remaining' => fake()->randomNumber(3),
            'is_unlimited' => fake()->boolean(),
            // 'color' => fake()->hexColor(),
            'deadline' => $end_date,
        ];
    }
}
