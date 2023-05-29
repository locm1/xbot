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
            'title' => 'required',
            'type' => 'required|numeric|between:1,5',
            'is_undisclosed' => 'required|boolean',
        ];
    }

    public function attributes()
    {
        return [
            'title' => '質問内容',
            'admin_id' => 'アカウントID',
            'type' => 'フォームタイプ',
            'is_undisclosed' => '公開ステータス',
            'display_order' => '並び順',
            'questionnaire_items.0.name' => '回答項目'
        ];
    }

    public function withValidator($validator)
    {
        $types = [3, 4, 5];
        $type = $this->type;

        $validate_rules = [
            'questionnaire_items.0.name' => 'required',
        ];
        foreach ($validate_rules as $key => $value) {
            $validator->sometimes($key, $value, function() use($type, $types) {
                return in_array($type, $types);
            });
        }
    }
}
