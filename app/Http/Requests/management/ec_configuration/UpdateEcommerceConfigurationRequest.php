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
        $is_enabled = $this->is_enabled;
        $type = $this->type;

        switch ($type) {
            case 'environment':
                $rules = [
                    'is_enabled' => 'nullable',
                    'postage' => 'nullable',
                    'target_amount' => 'nullable',
                    'cash_on_delivery_fee' => 'nullable',
                    'tel' => 'required|numeric|digits_between:8,11',
                    'email' => 'required|email:filter,dns'
                ];
                break;
            case 'payment':
                $rules = [
                    'is_enabled' => 'required|numeric|boolean',
                    'postage' => 'nullable',
                    'target_amount' => 'nullable',
                    'cash_on_delivery_fee' => $is_enabled === 1 ? 'required|numeric' : 'nullable',
                    'tel' => 'nullable',
                    'email' => 'nullable'
                ];
                break;
            case 'postage':
                $rules = [
                    'is_enabled' => 'nullable',
                    'postage' => 'required|numeric',
                    'target_amount' => 'required|numeric',
                    'cash_on_delivery_fee' => 'nullable',
                    'tel' => 'nullable',
                    'email' => 'nullable'
                ];
                break;
            default:
                $rules = [
                    'is_enabled' => 'required|numeric|boolean',
                    'postage' => 'required|numeric',
                    'target_amount' => 'required|numeric',
                    'cash_on_delivery_fee' => $is_enabled === 1 ? 'required|numeric' : 'nullable',
                    'tel' => 'required|numeric|digits_between:8,11',
                    'email' => 'required|email:filter,dns'
                ];
                break;
        }
        return $rules;
    }

    public function attributes()
    {
        return [
            'is_enabled' => '代引き手数料の有効ステータス',
            'postage' => '送料',
            'target_amount' => '対象金額',
            'cash_on_delivery_fee' => '代引き手数料',
            'tel' => '電話番号',
            'email' => 'メールアドレス'
        ];
    }
}
