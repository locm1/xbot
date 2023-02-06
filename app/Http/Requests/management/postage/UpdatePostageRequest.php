<?php

namespace App\Http\Requests\management\management\postage;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostageRequest extends FormRequest
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
            'pref_id' => 'required',
            'postage' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'postage.required' => '送料が未入力です',
        ];
    }
}
