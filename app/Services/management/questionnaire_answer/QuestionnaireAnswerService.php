<?php

namespace App\Services\management\questionnaire_answer;

use App\Models\QuestionnaireAnswer;
use App\Models\User;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireAnswerService 
{

    public function index(User $user) 
    {
        return $user->questionnaireAnswers()->with('questionnaire')->get();
    }


    public function store($request) 
    {
        //
    }


    public function show(Model $model) 
    {
        //
    }


    public function update($request, Model $model) 
    {
        //
    }


    public function destroy(Model $model) 
    {
        //
    }

}
