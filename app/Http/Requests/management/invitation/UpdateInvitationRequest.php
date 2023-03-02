<?php

namespace App\Http\Requests\management\invitation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvitationRequest extends FormRequest
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
            'coupon_id' => 'required|numeric|exists:coupons,id',
            'privilege_detail' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'coupon_id' => 'クーポンID',
            'privilege_detail' => '特典内容',
        ];
    }
}
