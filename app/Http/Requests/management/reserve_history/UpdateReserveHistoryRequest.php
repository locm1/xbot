<?php

namespace App\Http\Requests\management\reserve_history;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReserveHistoryRequest extends FormRequest
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
            'status' => 'required|numeric|between:1,3'
        ];
    }

    public function attributes()
    {
        return [
            'status' => 'ステータス',
        ];
    }
}
