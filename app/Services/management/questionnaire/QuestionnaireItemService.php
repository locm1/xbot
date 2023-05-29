<?php

namespace App\Services\management\questionnaire;

use App\Models\QuestionnaireItem;
use App\Services\management\questionnaire\FormatQuestionnaireAction;

class QuestionnaireItemService
{
    private $questionnaire_action;

    public function __construct(FormatQuestionnaireAction $questionnaire_action)
    {
        $this->questionnaire_action = $questionnaire_action;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */

    public function store($questionnaire_items, $questionnaire): array
    {
        $merged_data = $this->questionnaire_action->mergeQuestionnaireIdToArray($questionnaire_items, $questionnaire);
        QuestionnaireItem::upsert($merged_data, ['id']);
        return $merged_data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionnaireRequest  $request
     * @param  Questionnaire $questionnaire
     * @param  QuestionnaireItem $item
     * 
     */
    public function update($request, $questionnaire, $item)
    {
        $merged_data = $this->questionnaire_action->mergeQuestionnaireIdToArray($questionnaire, $request);
        $item->update($merged_data);
        return $merged_data;
    }


    public function destroy($delete_questionnaire_item_ids) 
    {
        return QuestionnaireItem::whereIn('id', $delete_questionnaire_item_ids)->delete();
    }

}
