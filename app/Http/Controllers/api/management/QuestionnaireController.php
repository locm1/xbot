<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\management\questionnaire\StoreQuestionnaireRequest;
use App\Services\management\questionnaire\QuestionnaireService;

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
        return response()->json(['questionnaire' => $questionnaire], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
