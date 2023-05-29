<?php

namespace App\Http\Controllers\api\management\questionnaire;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\questionnaire\StoreQuestionnaireRequest;
use App\Http\Requests\management\questionnaire\UpdateQuestionnaireRequest;
use App\Models\Questionnaire;
use App\Services\management\questionnaire\QuestionnaireService;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    private $questionnaire_service;

    public function __construct(QuestionnaireService $questionnaire_service) 
    {
        $this->questionnaire_service = $questionnaire_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questionnaires = $this->questionnaire_service->index();
        return response()->json(['questionnaires' => $questionnaires], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionnaireRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuestionnaireRequest $request)
    {
        $questionnaire = $this->questionnaire_service->store($request);
        return response()->json(['questionnaire' => $questionnaire], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Questionnaire $questionnaire)
    {
        $questionnaire = $this->questionnaire_service->show($questionnaire);
        return response()->json(['questionnaire' => $questionnaire], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Questionnaire $questionnaire
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionnaireRequest $request, Questionnaire $questionnaire)
    {
        $questionnaire = $this->questionnaire_service->update($request, $questionnaire);
        return response()->json(['questionnaire' => $questionnaire], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Questionnaire $questionnaire
     * @return \Illuminate\Http\Response
     */
    public function destroy(Questionnaire $questionnaire)
    {
        $this->questionnaire_service->destroy($questionnaire);
        return response()->json([], 204);
    }
}
