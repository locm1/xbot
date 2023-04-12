<?php

namespace App\Http\Requests\liff\event;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'user_id' => 'required|numeric|exists:users,id',
        ];
    }

    public function attributes()
    {
        return [
            'user_id' => 'ユーザーID',
        ];
    }

    public function withValidator($validator)
    {
        $event = $this->route('event');

        $validator->after(function ($validator) use ($event) {
            # 対象の予約残数が0より小さければバリデーション
            if ($event->remaining - 1 < 0) {
                $validator->errors()->add('event', '予約枠がなくなったので、予約できませんでした。予約一覧を再確認してください');
            }
        });
    }
}
