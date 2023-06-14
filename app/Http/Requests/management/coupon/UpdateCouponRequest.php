<?php

namespace App\Http\Requests\management\coupon;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCouponRequest extends FormRequest
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
            'upper_limit' => 'required|numeric',
            'discount_price' => 'required|numeric|between:1,100',
            'code' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '管理名称',
            'upper_limit' => '使用上限数',
            'discount_price' => '割引率(%)',
            'code' => '利用コード',
        ];
    }
}
