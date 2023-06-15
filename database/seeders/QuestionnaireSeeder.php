<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Questionnaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin_ids  = Admin::pluck('id')->all();

        $data = [
            [
                'admin_id' => fake()->randomElement($admin_ids),
                'title' => "本日ご来店されたきっかけを教えてください",
                'type' => 3,
                'display_order' => 1,
                'is_undisclosed' => 0,
                'is_required' => 0,
            ],
            [
                'admin_id' => fake()->randomElement($admin_ids),
                'title' => "髪でお悩みのことはありますか？",
                'type' => 4,
                'display_order' => 3,
                'is_undisclosed' => 0,
                'is_required' => 0,
            ],
            [
                'admin_id' => fake()->randomElement($admin_ids),
                'title' => "店内の雰囲気はいかがでしたか？",
                'type' => 2,
                'display_order' => 3,
                'is_undisclosed' => 0,
                'is_required' => 0,
            ],
            [
                'admin_id' => fake()->randomElement($admin_ids),
                'title' => "お気づきになったことがありましたらこちらにご記入ください",
                'type' => 1,
                'display_order' => 4,
                'is_undisclosed' => 0,
                'is_required' => 0,
            ],
            [
                'admin_id' => fake()->randomElement($admin_ids),
                'title' => "次回以降指名したい方がおりましたら選択してください",
                'type' => 5,
                'display_order' => 5,
                'is_undisclosed' => 0,
                'is_required' => 0,
            ],
        ];

        Questionnaire::insert($data);
    }
}
