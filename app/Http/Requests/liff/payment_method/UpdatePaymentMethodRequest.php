<?php

namespace App\Http\Requests\liff\payment_method;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentMethodRequest extends FormRequest
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
            'payment_method' => 'required|numeric|between:1,3'
        ];
    }

    public function attributes()
    {
        return [
            'payment_method' => '支払い方法',
        ];
    }
}
