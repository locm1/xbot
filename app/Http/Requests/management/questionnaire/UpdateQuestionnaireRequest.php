<?php

namespace App\Http\Requests\management\questionnaire;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionnaireRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'admin_id' =>'required|numeric|exists:admins,id',
            'type' => 'required|numeric|between:1,5',
            'is_undisclosed' => 'required|boolean',
            'display_order' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'title' => '質問',
            'admin_id' => 'アカウントID',
            'type' => 'フォームタイプ',
            'is_undisclosed' => '公開ステータス',
            'display_order' => '並び順',
        ];
    }
}
