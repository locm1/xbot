<?php

namespace App\Http\Requests\management\questionnaire;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionnaireItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' =>'nullable',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '選択項目名',
        ];
    }
}
