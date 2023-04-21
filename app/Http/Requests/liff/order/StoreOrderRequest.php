<?php

namespace App\Http\Requests\liff\order;

use App\Services\liff\product\FormatProductAction;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'order.first_name' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'order.first_name' => 'お届け先住所を選択してください。',
        ];
    }
}
