<?php

namespace App\Http\Requests\liff\coupon;

use App\Models\Coupon;
use App\Services\liff\coupon\CouponService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class StoreCouponRequest extends FormRequest
{
    private $coupon_service;

    public function __construct(CouponService $coupon_service)
    {
        $this->coupon_service = $coupon_service;
    }

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
            'code' => 'required|exists:coupons,code'
        ];
    }

    public function attributes()
    {
        return [
            'code' => 'クーポンコード',
        ];
    }

    public function withValidator($validator)
    {
        $user = $this->route('user');
        $code = $this->code;
        $coupon_codes = $this->coupon_service->index($user)->pluck('code')->toArray();

        $validator->after(function ($validator) use ($code, $coupon_codes) {
            # ユーザーが所有しているクーポン一覧の中に、リクエストで送られたクーポンコードがあればバリデーション
            if (in_array($code, $coupon_codes)) {
                $validator->errors()->add('code', '既にこのクーポンは適応されました');
            }
        });
    }
}
