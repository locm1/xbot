<?php

namespace App\Http\Requests\management\questionnaire;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionnaireRequest extends FormRequest
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
            'type' => 'required|numeric|between:1,5',
            'is_undisclosed' => 'required|boolean',
            'display_order' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'admin_id' => 'アカウントID',
            'type' => 'フォームタイプ',
            'is_undisclosed' => '公開ステータス',
            'display_order' => '並び順',
        ];
    }
}
