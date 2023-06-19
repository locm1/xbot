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
            'title' => 'nullable|max:50',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'remaining' => 'required|int',
            // 'title' => ['required', 'string', 'max:50'],
            // 'start_date' => ['required', 'date'],
            // 'end_date' => ['date'],
            // 'location' => ['required', 'max:50'],
            // 'remaining' => ['required', 'int'],
            // 'is_unlimited' => ['required', 'int'],
        ];
    }

    public function attributes()
    {
        return [
            'title' => '題名',
            'start_time' => '開始時刻',
            'end_time' => '終了時刻',
            'remaining' => '残数',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response['errors']  = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
