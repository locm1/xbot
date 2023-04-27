<?php

namespace App\Http\Requests\liff\questionnaire;

use App\Services\management\questionnaire\QuestionnaireEnablingService;
use App\Services\management\user\UserInfoStatusService;
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
        return $this->getRules();
    }

    private function getRules()
    {
        $service = new UserInfoStatusService();
        $user_info_statuses = $service->index()->pluck('is_required');

        $questionnair_enabling_service = new QuestionnaireEnablingService();
        $QuestionnairEnabling = $questionnair_enabling_service->show(1);

        if ($QuestionnairEnabling->is_default_questionnaire_enabled == 0) {
            return [
                'first_name' => 'nullable',
                'first_name_kana' => 'nullable',
                'last_name' => 'nullable',
                'last_name_kana' => 'nullable',
                'birth_date' => 'nullable',
                'gender' => 'nullable',
                'zipcode' => 'nullable',
                'prefecture' => 'nullable',
                'city' => 'nullable',
                'address' => 'nullable',
                'building_name' => 'nullable',
                'room_number' => 'nullable',
                'tel' => 'nullable',
                'occupation_id' => 'nullable',
                'is_registered' => 'required|numeric|boolean'
            ];
        }

        return [
            'first_name' => $user_info_statuses[0] == 1 ? 'required' : 'nullable',
            'first_name_kana' => $user_info_statuses[1] == 1 ? 'required' : 'nullable',
            'last_name' => $user_info_statuses[0] == 1 ? 'required' : 'nullable',
            'last_name_kana' => $user_info_statuses[1] == 1 ? 'required' : 'nullable',
            'birth_date' => $user_info_statuses[2] == 1 ? 'required|date' : 'nullable',
            'gender' => $user_info_statuses[3] == 1 ? 'required|numeric|between:1,3' : 'nullable',
            'zipcode' => $user_info_statuses[6] == 1 ? 'required|numeric|digits_between:7,7' : 'nullable',
            'prefecture' => $user_info_statuses[7] == 1 ? 'required' : 'nullable',
            'city' => $user_info_statuses[8] == 1 ? 'required' : 'nullable',
            'address' => $user_info_statuses[9] == 1 ? 'required' : 'nullable',
            'building_name' => $user_info_statuses[10] == 1 ? 'required' : 'nullable',
            'room_number' => $user_info_statuses[11] == 1 ? 'required' : 'nullable',
            'tel' => $user_info_statuses[4] == 1 ? 'required|numeric|digits_between:8,11' : 'nullable',
            'occupation_id' => $user_info_statuses[5] == 1 ? 'required|numeric|exists:occupations,id' : 'nullable',
            'is_registered' => 'required|numeric|boolean'
        ];
    }

    public function withValidator($validator)
    {
        $questionnaires = $this->questionnaires;
        $questionnair_enabling_service = new QuestionnaireEnablingService();
        $QuestionnairEnabling = $questionnair_enabling_service->show(1);
        
        foreach ($questionnaires as $key => $questionnaire) {
            $is_required = $questionnaire['is_required'];

            $validation_rules = [
                "questionnaires.$key.answer" => $QuestionnairEnabling->is_questionnaire_enabled === 1 ? 'required' : 'nullable',
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
            'room_number' => '部屋番号',
            'tel' => '電話番号',
            'occupation_id' => 'ご職業',
            'is_registered' => '登録ステータス',
            'questionnaires.*.answer' => '回答'
        ];
    }
}
