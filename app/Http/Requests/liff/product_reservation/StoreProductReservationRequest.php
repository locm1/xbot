<?php

namespace App\Http\Requests\liff\product_reservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductReservationRequest extends FormRequest
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
            'product_id' => 'required|numeric|exists:products,id',
            'quantity' => 'required|numeric'
        ];
    }

    public function attributes()
    {
        return [
            'product_id' => '商品ID',
            'quantity' => '数量'
        ];
    }
}
