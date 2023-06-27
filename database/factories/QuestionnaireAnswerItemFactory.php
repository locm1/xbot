<?php

namespace Database\Factories;

use App\Models\QuestionnaireAnswer;
use App\Models\QuestionnaireItem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

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
        $questionnaire_answer_id = fake()->randomElement($questionnaire_answer_ids);
        $questionnaire_id = QuestionnaireAnswer::find($questionnaire_answer_id)->questionnaire_id;
        $answers = QuestionnaireItem::where('questionnaire_id', $questionnaire_id)->pluck('name');
        $answer = fake()->randomElement($answers);
        $random_element = ['特になし', '良かった'];

        return [
            'questionnaire_answer_id' => $questionnaire_answer_id,
            'answer' => $answer,
        ];
    }
}
