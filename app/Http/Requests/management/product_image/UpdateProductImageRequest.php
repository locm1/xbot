<?php

namespace App\Http\Requests\management\product_image;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductImageRequest extends FormRequest
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
            // 'product_images' => 'required|array',
            // 'product_images.*.file' => 'file|mimes:jpeg,png,jpg,pdf',
        ];
    }

    public function attributes()
    {
        return [
            'product_images' => '画像ファイルリスト',
        ];
    }
}
