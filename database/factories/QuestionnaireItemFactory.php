<?php

namespace Database\Factories;

use App\Models\Questionnaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class QuestionnaireItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $questionnaire_ids = Questionnaire::pluck('id')->all();

        return [
            'questionnaire_id' => fake()->randomElement($questionnaire_ids),
            'name' => fake()->word(),
        ];
    }
}
