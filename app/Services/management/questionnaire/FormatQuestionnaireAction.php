<?php

namespace App\Services\management\questionnaire;

class FormatQuestionnaireAction
{
    /**
     * アンケートID（外部キー）をリクエストの配列にマージ
     *
     * @return array
     **/
    public function mergeQuestionnaireIdToArray($questionnaire, $request): array
    {
        $questionnaire_id = $questionnaire->id;
        $merged_data = array_merge($request->only(['name']), ['questionnaire_id' => $questionnaire_id]);
        return $merged_data;
    }

}
