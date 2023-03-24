<?php

namespace App\Http\Requests\management\ec_configuration;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEcommerceConfigurationRequest extends FormRequest
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
            'is_enabled' => 'required|numeric|boolean',
            'postage' => 'required|numeric',
            'target_amount' => 'required|numeric',
            'tel' => 'required|numeric|digits_between:8,11',
        ];
    }

    public function attributes()
    {
        return [
            'is_enabled' => '代引き手数料の有効ステータス',
            'postage' => '送料',
            'target_amount' => '対象金額',
            'cash_on_delivery_fee' => '代引き手数料',
            'tel' => '電話番号',
        ];
    }

    public function withValidator($validator)
    {
        $is_enabled = $this->is_enabled;
        $validation_rules = [
            'cash_on_delivery_fee' => 'required|numeric',
        ];
        foreach ($validation_rules as $key => $value) {
            # 代引きが有効ならバリデーション追加
            $validator->sometimes($key, $value, function() use($is_enabled) {
                return $is_enabled == 1;
            });
        }
    }
}