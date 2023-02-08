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

    public function store($request, $questionnaire): QuestionnaireItem
    {
        $merged_data = $this->questionnaire_action->mergeQuestionnaireIdToArray($questionnaire, $request);
        return QuestionnaireItem::create($merged_data);
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


    public function destroy($item) 
    {
        return $item->delete();
    }

}
