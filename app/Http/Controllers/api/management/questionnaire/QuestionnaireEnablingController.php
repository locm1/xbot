<?php

namespace App\Http\Controllers\api\management\questionnaire;

use App\Http\Controllers\Controller;
use App\Models\QuestionnaireEnabling;
use App\Services\management\questionnaire\QuestionnaireEnablingService;
use Illuminate\Http\Request;

class QuestionnaireEnablingController extends Controller
{
    private $service;

    public function __construct(QuestionnaireEnablingService $service)
    {
        $this->service = $service;
    }
    
    /**
     * Display the specified resource.
     *
     * @param  QuestionnaireEnabling $questionnaire_enabling
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionnaireEnabling $questionnaire_enabling)
    {
        $questionnaireEnabling = $this->service->show($questionnaire_enabling);
        return response()->json(['questionnaire_enabling' => $questionnaireEnabling], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProductRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuestionnaireEnabling $questionnaire_enabling)
    {
        return $this->service->update($request, $questionnaire_enabling);
    }
}
