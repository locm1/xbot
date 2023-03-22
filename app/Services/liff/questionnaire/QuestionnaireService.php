<?php

namespace App\Services\liff\questionnaire;

use App\Models\Questionnaire;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class QuestionnaireService
{
    public function index(): Collection
    {
        return Questionnaire::with('questionnaireItems')->where('is_undisclosed', 0)->orderBy('display_order', 'asc')->get();
    }
}
