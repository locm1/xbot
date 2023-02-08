<?php

namespace App\Http\Controllers\api\management\questionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\management\questionnaire\StoreQuestionnaireItemRequest;
use App\Http\Requests\management\questionnaire\UpdateQuestionnaireItemRequest;
use App\Models\Questionnaire;
use App\Models\QuestionnaireItem;
use App\Services\management\questionnaire\QuestionnaireItemService;

class QuestionnaireItemController extends Controller
{
    private $questionnaire_item_service;

    public function __construct(QuestionnaireItemService $questionnaire_item_service) 
    {
        $this->questionnaire_item_service = $questionnaire_item_service;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionnaireItemRequest  $request
     * @param  Questionnaire  $questionnaire
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuestionnaireItemRequest $request, Questionnaire $questionnaire)
    {
        $questionnaire_item = $this->questionnaire_item_service->store($request, $questionnaire);
        return response()->json(['questionnaire_item' => $questionnaire_item], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionnaireRequest  $request
     * @param  Questionnaire $questionnaire
     * @param  QuestionnaireItem $item
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionnaireItemRequest $request, Questionnaire $questionnaire, QuestionnaireItem $item)
    {
        $questionnaire = $this->questionnaire_item_service->update($request, $questionnaire, $item);
        return response()->json(['questionnaire_item' => $questionnaire], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  Questionnaire $questionnaire
     * @param  QuestionnaireItem $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Questionnaire $questionnaire, QuestionnaireItem $item)
    {
        $this->questionnaire_item_service->destroy($item);
        return response()->json([], 204);
    }
}
