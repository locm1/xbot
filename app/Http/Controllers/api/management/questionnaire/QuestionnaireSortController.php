<?php

namespace App\Http\Controllers\api\management\questionnaire;

use App\Http\Controllers\Controller;
use App\Models\Questionnaire;
use App\Services\management\questionnaire\QuestionnaireSortService;
use Illuminate\Http\Request;

class QuestionnaireSortController extends Controller
{
    private $questionnaire_sort_service;

    public function __construct(QuestionnaireSortService $questionnaire_sort_service) {
        $this->questionnaire_sort_service = $questionnaire_sort_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Questionnaire $questionnaire)
    {
        $display_order = $this->questionnaire_sort_service->sort($request, $questionnaire);
        return response()->json(['display_order' => $display_order], 200);
    }
}
