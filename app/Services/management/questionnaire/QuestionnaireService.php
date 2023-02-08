<?php

namespace App\Services\management\questionnaire;

use App\Models\Questionnaire;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class QuestionnaireService
{

    public function index(): Collection
    {
        return Questionnaire::with('questionnaireTitles')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */

    public function store($reqest): Questionnaire
    {
        $data = $reqest->only(['title', 'type', 'display_order', 'is_undisclosed']);
        $merged_data = array_merge($data, ['admin_id' => Auth::id()]);
        return Questionnaire::create($merged_data);
    }

}
