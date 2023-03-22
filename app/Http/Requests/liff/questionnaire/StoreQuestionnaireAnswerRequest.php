<?php

namespace App\Http\Requests\liff\questionnaire;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionnaireAnswerRequest extends FormRequest
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
            
        ];
    }

    public function withValidator($validator)
    {
        $questionnaires = $this->questionnaires;

        foreach ($questionnaires as $key => $questionnaire) {
            $is_required = $questionnaire['is_required'];

            $validation_rules = [
                "questionnaires.$key.answer" => 'required',
            ];
            foreach ($validation_rules as $key => $value) {
                # 現在のルートのアクションがcreateならバリデーション追加
                $validator->sometimes($key, $value, function() use($is_required) {
                    return $is_required == 1;
                });
            }
        }
    }
}
