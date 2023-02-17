<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class QuestionnaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $admin_ids  = Admin::pluck('id')->all();

        return [
            'admin_id' => fake()->randomElement($admin_ids),
            'title' => "昨日何を食べましたか？",
            'type' => fake()->numberBetween(1, 5),
            'display_order' => fake()->unique()->numberBetween(1,100),
            'is_undisclosed' => fake()->numberBetween(0, 1),
        ];
    }
}
