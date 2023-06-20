<?php

namespace App\Http\Requests\management\greeting;

use Illuminate\Foundation\Http\FormRequest;

class StoreGreetingMessageRequest extends FormRequest
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
            'messages' => 'required|array',
            'messages.*.type' => 'required|between:1,3',
            'images' => 'nullable|array|max:5',
            // 'images.*' => 'file|max:10240|mimes:jpeg,png,jpg',
            'image_ids' => 'nullable|array|max:5',
            'videos' => 'nullable|array|max:5',
            'videos.*' => 'file|max:204800|mimes:mp4',
            'video_ids' => 'nullable|array|max:5',
        ];
    }

    public function withValidator($validator)
    {
        $messages = $this->messages;
        $image_ids = $this->image_ids;
        $images = $this->images;

        foreach ($messages as $key => $message) {
            $validator->sometimes("messages.$key.text", 'required', function() use($message) {
                return $message['type'] == 1;
            });

            $validator->sometimes("messages.$key.image_path", 'required', function() use($message) {
                return $message['type'] == 2;
            });

            $validator->sometimes("messages.$key.video_path", 'required', function() use($message) {
                return $message['type'] == 3;
            });
        }

        $validator->after(function ($validator) use($messages) {
            if (count($messages) > 5) {
                $validator->errors()->add('max_count_error', 'あいさつメッセージは最大5件までです。');
            }
        });
    }

    public function attributes()
    {
        $messages = array();
        $messages = $this->messages;

        foreach ($messages as $key => $message) {
            $messages["messages.$key.text"] = 'テキスト';
            $messages["messages.$key.image_path"] = '画像';
            $messages["messages.$key.video_path"] = '動画';
        }
        $messages['images.*'] = '画像';
        return $messages;
    }

    protected function prepareForValidation()
    {
        $messages = $this->messages;

        if ($messages) {
            $this->merge(['messages' => json_decode($this->messages, true)]);
        }
    }
}
