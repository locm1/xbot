<?php

namespace App\Http\Requests\management\postage;

use Illuminate\Foundation\Http\FormRequest;

class StorePostageRequest extends FormRequest
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
            'postages' => 'required|array',
            'postages.*.prefecture_id' => 'required|numeric',
            'postages.*.postage' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'postages.*.postage' => '送料',
            'postages.*prefecture_id' => '都道府県ID'
        ];
    }
}
