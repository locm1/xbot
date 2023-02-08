<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;
use App\Services\common\DisplayOrderUtility;

class QuestionnaireSortService
{
    /**
     * sort category.
     *
     * @param \Illuminate\Http\Request  $request
     * @param PQuestionnaire $questionnaire
     */
    public function sort($request, Questionnaire $questionnaire) 
    {
        $begin_item = $request->begin_item;
        $end_item = $request->end_item;
        $display_order = DisplayOrderUtility::getDisplayOrder($begin_item, $end_item);
        $questionnaire->update(['display_order' => $display_order]);
        return $display_order;
    }

}
