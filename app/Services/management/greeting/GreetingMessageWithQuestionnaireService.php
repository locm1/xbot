<?php

namespace App\Services\management\greeting;

use App\Models\GreetingMessage;
use App\Models\GreetingMessagesWithQuestionnaire;

class GreetingMessageWithQuestionnaireService
{
    public function index() 
    {
        return GreetingMessagesWithQuestionnaire::all();
    }

    public function store($request) 
    {
        $data = $request->only(['is_questionnaire']);
        return GreetingMessagesWithQuestionnaire::create($data);
    }

    public function update($request, GreetingMessagesWithQuestionnaire $questionnaire) 
    {
        $data = $request->only(['is_questionnaire']);
        return $questionnaire->update($data);
    }

}
