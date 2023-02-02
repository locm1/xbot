<?php

namespace App\Http\Requests\management\privilege;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePrivilegeRequest extends FormRequest
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
            'visits_times' => 'required|numeric'
        ];
    }

    public function attributes()
    {
        return [
            'visits_times' => '来店回数',
        ];
    }
}
