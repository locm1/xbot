<?php

namespace App\Http\Controllers\api\liff\questionnaire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
}
