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
            'first_name' => 'required',
            'first_name_kana' => 'required',
            'last_name' => 'required',
            'last_name_kana' => 'required',
            'birth_date' => 'required|date',
            'gender' => 'required|numeric|between:1,3',
            'zipcode' => 'required|numeric|digits_between:7,7',
            'prefecture' => 'required',
            'city' => 'required',
            'address' => 'required',
            'tel' => 'required|numeric|digits_between:8,11',
            'occupation_id' => 'required|numeric|exists:occupations,id',
            'is_registered' => 'required|numeric|boolean',
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

    public function attributes()
    {
        return [
            'first_name' => '氏名（名）',
            'first_name_kana' => 'フリガナ（名）',
            'last_name' => '氏名（姓）',
            'last_name_kana' => 'フリガナ（姓）',
            'birth_date' => '生年月日',
            'gender' => '性別',
            'zipcode' => '郵便番号',
            'prefecture' => '都道府県',
            'city' => '市区町村',
            'address' => '丁目・番地・号',
            'building_name' => '建物名/会社名',
            'tel' => '電話番号',
            'occupation_id' => 'ご職業',
            'is_registered' => '登録ステータス',
            'questionnaires.*.answer' => '回答'
        ];
    }
}
