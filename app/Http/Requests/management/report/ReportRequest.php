<?php

namespace App\Http\Requests\management\report;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
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
            'name' => 'required', 
            'period' => [
                'required_if:xlabel,1', // xlabelが1の場合にperiodを必須にする
            ],
            'xlabel' => 'required|integer', 
            'type' => 'required|integer', 
            // 'searchTerms' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'タイトル', 
            'period' => '期間', 
            'xlabel' => 'x軸設定', 
            'type' => 'グラフ種別', 
            // 'searchTerms' => '出力条件'
        ];
    }
}
