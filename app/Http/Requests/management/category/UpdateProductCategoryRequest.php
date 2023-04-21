<?php

namespace App\Http\Requests\management\category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductCategoryRequest extends FormRequest
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
            'name' => 'required', 
            'color' => 'required', 
            'content' => 'required', 
            'is_undisclosed' => 'required|boolean'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'カテゴリー名',
            'color' => 'カラー', 
            'content' => 'カテゴリー概要', 
            'is_undisclosed' => '非公開'
        ];
    }

    public function messages()
    {
        return [
            'color.required' => 'カラーを選択してください',
        ];
    }
}
