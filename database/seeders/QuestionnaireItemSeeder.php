<?php

namespace Database\Seeders;

use App\Models\Questionnaire;
use App\Models\QuestionnaireItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionnaireItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
            'questionnaire_id' => 1,
            'name' => "とても良かった",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "とても良かった",
            ],
            [
            'questionnaire_id' => 3,
            'name' => "とても良かった",
            ],
            [
            'questionnaire_id' => 3,
            'name' => "良かった",
            ],
            [
            'questionnaire_id' => 3,
            'name' => "悪かった",
            ],
            [
            'questionnaire_id' => 3,
            'name' => "とても悪かった",
            ],
            [
            'questionnaire_id' => 4,
            'name' => "とても良かった",
            ],
            [
            'questionnaire_id' => 4,
            'name' => "良かった",
            ],
            [
            'questionnaire_id' => 4,
            'name' => "悪かった",
            ],
            [
            'questionnaire_id' => 4,
            'name' => "とても悪かった",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "とても良かった",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "良かった",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "悪かった",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "とても悪かった",
            ],
        ];

        QuestionnaireItem::insert($data);
    }
}
