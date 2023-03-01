<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserWithQuestionneireController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return [
            'users' => 
            User::with('questionnaireAnswers.questionnaireAnswerItems')
                ->with('visitorHistories')
                ->with('orderHistories')
                ->get()
        ];
    }
}
