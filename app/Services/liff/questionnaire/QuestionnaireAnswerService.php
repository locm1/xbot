<?php

namespace App\Services\liff\questionnaire;

use App\Models\OrderDestination;
use App\Models\QuestionnaireAnswer;
use App\Models\QuestionnaireAnswerItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Services\liff\questionnaire\FormatQuestionnaireAnswerAction;
use Illuminate\Support\Facades\Log;

class QuestionnaireAnswerService
{
    private $format_questionnaire_answer_action;

    public function __construct(FormatQuestionnaireAnswerAction $format_questionnaire_answer_action)
    {
        $this->format_questionnaire_answer_action = $format_questionnaire_answer_action;
    }

    public function store($request, User $user)
    {
        $merged_questionnaire_answers = $this->format_questionnaire_answer_action->mergeUserIdToArray($user, $request->questionnaires);
        # トランザクションの実行
        DB::transaction(function() use($merged_questionnaire_answers) {
            $questionnaire_answer_ids = $this->getQuestionnaireAnswerIds($merged_questionnaire_answers);

            $merged_questionnaire_answer_items = $this->format_questionnaire_answer_action->mergeQuestionnaireAnswerIdToArray($questionnaire_answer_ids, $merged_questionnaire_answers);
            QuestionnaireAnswerItem::upsert($merged_questionnaire_answer_items, ['id']);
        });

        return $merged_questionnaire_answers;
    }


    private function getQuestionnaireAnswerIds($merged_questionnaire_answers)
    {
        $questionnaire_answer_ids = array();

        array_walk($merged_questionnaire_answers, function(&$merged_questionnaire_answer){ 
            unset($merged_questionnaire_answer['answer']);
        });

        # バルクインサート
        QuestionnaireAnswer::upsert($merged_questionnaire_answers, ['id']);
        $last_id = DB::getPdo()->lastInsertId();

        for ($i = 0; $i < count($merged_questionnaire_answers); $i++) {
            $questionnaire_answer_ids[] = $last_id + $i;
        }
        return $questionnaire_answer_ids;
    }
}
