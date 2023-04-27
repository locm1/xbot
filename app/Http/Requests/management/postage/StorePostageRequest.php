<?php

namespace App\Http\Requests\management\postage;

use Illuminate\Foundation\Http\FormRequest;

class StorePostageRequest extends FormRequest
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
            'postages' => 'required|array',
            'postages.*.prefecture_id' => 'required|numeric',
            'postages.*.postage' => 'required|numeric',
            'is_enabled' => 'nullable',
            'postage' => 'required|numeric',
            'target_amount' => 'required|numeric',
            'cash_on_delivery_fee' => 'nullable',
            'tel' => 'nullable',
            'email' => 'nullable'
        ];
    }

    public function attributes()
    {
        return [
            'postages.*.postage' => '送料',
            'postages.*prefecture_id' => '都道府県ID',
            'is_enabled' => '代引き手数料の有効ステータス',
            'postage' => '送料',
            'target_amount' => '対象金額',
            'cash_on_delivery_fee' => '代引き手数料',
            'tel' => '電話番号',
            'email' => 'メールアドレス'
        ];
    }
}
