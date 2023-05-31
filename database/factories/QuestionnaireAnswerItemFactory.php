<?php

namespace Database\Factories;

use App\Models\QuestionnaireAnswer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuestionnaireAnswerItem>
 */
class QuestionnaireAnswerItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $questionnaire_answer_ids  = QuestionnaireAnswer::pluck('id')->all();
        $random_element = ['特になし', '良かった'];

        return [
            'questionnaire_answer_id' => fake()->randomElement($questionnaire_answer_ids),
            'answer' => fake()->randomElement($random_element),
        ];
    }
}
