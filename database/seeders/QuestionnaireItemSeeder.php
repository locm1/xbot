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
            'name' => "友達に教えてもらった",
            ],
            [
            'questionnaire_id' => 1,
            'name' => "Twitterを見た",
            ],
            [
            'questionnaire_id' => 1,
            'name' => "Instagramを見た",
            ],
            [
            'questionnaire_id' => 1,
            'name' => "その他",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "くせ（広がり・うねり）",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "白髪",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "ダメージ",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "乾燥",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "抜け毛",
            ],
            [
            'questionnaire_id' => 2,
            'name' => "におい",
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
            'name' => "鈴木",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "田中",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "齋藤",
            ],
            [
            'questionnaire_id' => 5,
            'name' => "木村",
            ],
        ];

        QuestionnaireItem::insert($data);
    }
}
