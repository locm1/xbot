<?php

namespace App\Http\Requests\management\visitor_history;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVisitorHistoryRequest extends FormRequest
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
            'created_at' => 'required|date',
            'memo' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'created_at' => '来店日時',
            'memo' => 'メモ',
        ];
    }
}
