<?php

namespace App\Http\Requests\management\message;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'messages' => 'required|array|max:5',
            'messages.*.id' => 'required|exists:messages,id',
            'messages.*.type' => 'required|between:1,3',
            'images' => 'nullable|array|max:5',
            'images.*' => 'file|max:10240|mimes:jpeg,png,jpg',
            'image_ids' => 'nullable|array|max:5',
            'image_ids.*' => 'exists:messages,id',
            'videos' => 'nullable|rarray|max:5',
            'videos.*' => 'file|max:204800|mimes:mp4',
            'video_ids' => 'nullable|array|max:5',
            'video_ids.*' => 'exists:messages,id',
        ];
    }

    public function attributes()
    {
        return [
            'messages' => 'あいさつメッセージリスト',
            'images' => '画像ファイルリスト',
            'image_ids' => 'あいさつメッセージIDリスト',
            'videos' => '動画ファイルリスト',
            'video_ids' => 'あいさつメッセージIDリスト',
        ];
    }
}
