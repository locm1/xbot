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
            'files' => 'required|array',
            'files.*' => 'file|mimes:jpeg,png,jpg,pdf',
            'product_image_ids' => 'required|array',
            'product_image_ids.*' => 'exists:product_images,id',
        ];
    }

    public function attributes()
    {
        return [
            'files' => '画像ファイルリスト',
            'product_image_ids' => '画像IDリスト',
        ];
    }
}
