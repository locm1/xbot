<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;
use App\Models\QuestionnaireEnabling;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class QuestionnaireEnablingService
{

    public function show($id): QuestionnaireEnabling
    {
        return QuestionnaireEnabling::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  QuestionnaireEnabling  $request
     * @param  Questionnaire $questionnaire
     * 
     */
    public function update($request, QuestionnaireEnabling $questionnaire_enabling)
    {
        $data = $request->only(['is_default_questionnaire_enabled', 'is_questionnaire_enabled']);
        return $questionnaire_enabling->update($data);
    }

}
