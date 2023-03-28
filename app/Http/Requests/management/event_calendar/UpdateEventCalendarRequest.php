<?php

namespace App\Http\Requests\management\event_calendar;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateEventCalendarRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:50'],
            'start_date' => ['required', 'date'],
            'end_date' => ['date'],
            'location' => ['required', 'max:50'],
            'remaining' => ['required', 'int'],
            'is_unlimited' => ['required', 'int'],
        ];
    }

    /**
     * 定義済みバリデーションルールのエラーメッセージ取得
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => '題名は必須です',
            'title.string' => '題名の値が不正です',
            'title.max' => '題名は50文字までです',
            'start_date.required' => '開始日付は必須です',
            'end_date.after' => '終了日付が開始日付よりも前になっています',
            'location.required' => '場所は必須です',
            'remaining.required' => '残数は必須です',
            'is_unlimited.required' => '値が不正です',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException( response()->json( $response, 422 ));
    }
}
