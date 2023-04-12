<?php

namespace Database\Seeders;

use App\Models\GreetingMessagesWithQuestionnaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GreetingMessagesWithQuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GreetingMessagesWithQuestionnaire::create([
            'is_questionnaire' => 0,
        ]);
    }
}
