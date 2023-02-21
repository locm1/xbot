<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\DefaultSegment;
use App\Models\Questionnaire;
use Illuminate\Http\Request;

class SegmentController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return ['questionnaires' => Questionnaire::with('questionnaireItems')->get()];
    }
}
