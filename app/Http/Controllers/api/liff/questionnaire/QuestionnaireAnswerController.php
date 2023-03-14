<?php

namespace App\Http\Controllers\api\liff\questionnaire;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\questionnaire\QuestionnaireAnswerService;
use Illuminate\Http\Request;

class QuestionnaireAnswerController extends Controller
{
    private $questionnaire_answer_service;

    public function __construct(QuestionnaireAnswerService $questionnaire_answer_service)
    {
        $this->questionnaire_answer_service = $questionnaire_answer_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user)
    {
        $questionnaire_answers = $this->questionnaire_answer_service->store($request, $user);
        return response()->json(['questionnaire_answers' => $questionnaire_answers], 200);
    }
}
