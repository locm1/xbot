<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionnaireEnablingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questionnaire_enables = [
            'is_default_questionnaire_enabled' => 1,
            'is_questionnaire_enabled' => 1,
        ];
        DB::table('questionnaire_enabling')->insert($questionnaire_enables);
    }
}
