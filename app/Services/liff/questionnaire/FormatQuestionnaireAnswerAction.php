<?php

namespace App\Services\liff\questionnaire;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class FormatQuestionnaireAnswerAction
{
    /**
     * 
     *
     * @return array
     **/
    public function mergeUserIdToArray($user, $questionnaires): array
    {
        $merged_questionnaire_answers = array();

        foreach ($questionnaires as $questionnaire) {
            $merged_questionnaire_answers[] = [
                'user_id' => $user->id,
                'questionnaire_id' => $questionnaire['id'],
                'answer' => $questionnaire['answer']
            ];
        }
        return $merged_questionnaire_answers;
    }

    /**
     * 
     *
     * @return array
     **/
    public function mergeQuestionnaireAnswerIdToArray($questionnaire_answer_ids, $merged_questionnaire_answers): array
    {
        $merged_questionnaire_answer_items = array();

        foreach (array_map(null, $questionnaire_answer_ids, $merged_questionnaire_answers) as [$questionnaire_answer_id, $merged_questionnaire_answer]) {
            # 回答が複数あった場合（配列だった場合）
            if (is_array($merged_questionnaire_answer['answer'])) {
                foreach ($merged_questionnaire_answer['answer'] as $answer) {
                    $merged_questionnaire_answer_items[] = [
                        'questionnaire_answer_id' => $questionnaire_answer_id,
                        'answer' => $answer['value']
                    ];
                }
            } else {
                $merged_questionnaire_answer_items[] = [
                    'questionnaire_answer_id' => $questionnaire_answer_id,
                    'answer' => $merged_questionnaire_answer['answer']
                ];
            }
        }
        return $merged_questionnaire_answer_items;
    }

}
