<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\GreetingMessagesWithQuestionnaire;
use App\Services\management\greeting\GreetingMessageWithQuestionnaireService;
use Illuminate\Http\Request;

class GreetingMessagesWithQuestionnaireController extends Controller
{
    private $greeting_messages_with_questionnaire_serivce;

    public function __construct(GreetingMessageWithQuestionnaireService $greeting_messages_with_questionnaire_serivce)
    {
        $this->greeting_messages_with_questionnaire_serivce = $greeting_messages_with_questionnaire_serivce;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $greeting_message_with_questionnaires = $this->greeting_messages_with_questionnaire_serivce->index();
        return response()->json(['greeting_message_with_questionnaires' => $greeting_message_with_questionnaires], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $greeting_message_with_questionnaire = $this->greeting_messages_with_questionnaire_serivce->store($request);
        return response()->json(['greeting_message_with_questionnaire' => $greeting_message_with_questionnaire], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GreetingMessagesWithQuestionnaire $questionnaire)
    {
        $greeting_message_with_questionnaire = $this->greeting_messages_with_questionnaire_serivce->update($request, $questionnaire);
        return response()->json(['greeting_megreeting_message_with_questionnairessages' => $greeting_message_with_questionnaire], 200);
    }
}
