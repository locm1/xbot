<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\GreetingMessagesWithQuestionnaire;
use Illuminate\Http\Request;

class GreetingAnswerButtonController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return GreetingMessagesWithQuestionnaire::find(1)->update(['is_questionnaire' => $request->isQuestionnaireAnswerButton]);
    }
}
