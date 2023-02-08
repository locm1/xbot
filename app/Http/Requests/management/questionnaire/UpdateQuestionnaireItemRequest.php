<?php

namespace App\Http\Requests\management\questionnaire;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionnaireItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'name' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'questionnaire_id' => 'アンケートID',
            'name' => '選択項目名'
        ];
    }
}
