<?php

namespace Database\Factories;

use App\Models\Questionnaire;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class QuestionnaireAnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids  = User::pluck('id')->all();
        $questionnaire_ids  = Questionnaire::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            'questionnaire_id' => fake()->randomElement($questionnaire_ids),
        ];
    }
}
