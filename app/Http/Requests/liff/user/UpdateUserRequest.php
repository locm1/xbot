<?php

namespace App\Http\Requests\liff\user;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'building_name' => 'required',
            'tel' => 'required|numeric|digits_between:8,11',
            'occupation_id' => 'required|numeric|exists:occupations,id',
            'is_registered' => 'required|numeric|boolean',
        ];
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
        ];
    }
}
