<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;

class FormatQuestionnaireAction
{
    /**
     * アンケートID（外部キー）をリクエストの配列にマージ
     *
     * @return array
     **/
    public function mergeQuestionnaireIdToArray($questionnaire_items, $questionnaire): array
    {
        $merged_questionnaire_items = array();

        foreach ($questionnaire_items as $item) {
            $merged_questionnaire_items[] = [
                'id' => $item['id'] ?? null,
                'questionnaire_id' => $questionnaire->id,
                'name' => $item['name']
            ];
        }
        return $merged_questionnaire_items;
    }


    public function mergeDisplayorderToArray(array $data): array
    {
        $questionnaire = Questionnaire::latest('display_order')->first();
        $display_order = isset($questionnaire) ? $questionnaire->display_order + 1.0 : 1.0;
        return array_merge($data, ['display_order' => $display_order]);
    }

}
