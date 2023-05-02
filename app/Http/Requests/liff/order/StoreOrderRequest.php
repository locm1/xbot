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
        $payment_method = $this->order['payment_method'];
        return [
            'order.first_name' => 'required',
            // 'charge.payjp_customer_id' => $payment_method == 1 ? 'required' : 'nullable'
        ];
    }

    public function messages()
    {
        return [
            'order.first_name' => 'お届け先住所を選択してください。',
            'charge.payjp_customer_id' => 'クレジットカードを選択してください。',
        ];
    }
}
