<?php

namespace App\Http\Requests\management\admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdminRequest extends FormRequest
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
            'login_id' => 'required',
            'name' => 'required',
            'role' => 'required|numeric|between:1,3',
            'password' => 'required|confirmed',
        ];
    }
}
