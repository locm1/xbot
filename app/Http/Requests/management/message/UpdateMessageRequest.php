<?php

namespace App\Http\Requests\management\message;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UpdateMessageRequest extends FormRequest
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
            'title' => 'required',
            'is_undisclosed' => 'required|boolean',
            'message_items' => 'required|array',
            // 'messages' => 'required|array|max:5',
            // 'messages.*.id' => 'required|exists:messages,id',
            // 'messages.*.type' => 'required|between:1,3',
            // 'images' => 'nullable|array|max:5',
            // 'images.*' => 'file|max:10240|mimes:jpeg,png,jpg',
            // 'image_ids' => 'nullable|array|max:5',
            // 'image_ids.*' => 'exists:messages,id',
            // 'videos' => 'nullable|rarray|max:5',
            // 'videos.*' => 'file|max:204800|mimes:mp4',
            // 'video_ids' => 'nullable|array|max:5',
            // 'video_ids.*' => 'exists:messages,id',
        ];
    }

    public function withValidator($validator)
    {
        $message_items = $this->message_items;
        foreach ($message_items as $key => $message_item) {
            // $image_rules = [
            //     'message_image.*' => 'file|max:10240|mimes:jpeg,png,jpg',
            // ];

            $carousel_image_rules = [
                'carousel_image_images.*' => 'file|max:10240|mimes:jpeg,png,jpg',
                "message_items.$key.carousel_images.*.image_path" => 'required',
                "message_items.$key.carousel_images.*.label" => 'required|max:12',
                "message_items.$key.carousel_images.*.uri" => 'required|url',
            ];

            $carousel_product_rules = [
                'carousel_product_images.*' => 'file|max:10240|mimes:jpeg,png,jpg',
                "message_items.$key.carousel_products.*.image_path" => 'required',
                "message_items.$key.carousel_products.*.text" => 'required|max:60',
                "message_items.$key.carousel_products.*.title" => 'required|max:40',
                "message_items.$key.carousel_products.*.label" => 'required|max:20',
                "message_items.$key.carousel_products.*.uri" => 'required|url',
            ];

            $validator->sometimes("message_items.$key.text", 'required', function() use($message_item) {
                return $message_item['type'] == 1;
            });

            $validator->sometimes("message_items.$key.image_path", 'required', function() use($message_item) {
                return $message_item['type'] == 2;
            });

            $validator->sometimes("message_items.$key.video_path", 'required', function() use($message_item) {
                return $message_item['type'] == 3;
            });

            foreach ($carousel_image_rules as $key => $value) {
                $validator->sometimes($key, $value, function() use($message_item) {
                    return $message_item['type'] == 4;
                });
            }

            foreach ($carousel_product_rules as $key => $value) {
                $validator->sometimes($key, $value, function() use($message_item) {
                    return $message_item['type'] == 5;
                });
            }
        }
    }

    public function attributes()
    {
        $messages = array();
        $message_items = $this->message_items;
        foreach ($message_items as $key => $message_item) {
            $messages["message_items.$key.text"] = 'テキスト';
            $messages["message_items.$key.image_path"] = '画像';
            $messages["message_items.$key.video_path"] = '動画';
            $messages["carousel_image_images.*"] = 'カルーセル画像';
            $messages["message_items.$key.carousel_images.*.image_path"] = 'カルーセル画像';
            $messages["message_items.$key.carousel_images.*.label"] = '画像カルーセルラベル';
            $messages["message_items.$key.carousel_images.*.uri"] = '画像カルーセルURL';
            $messages["carousel_product_images.*"] = '商品カルーセル画像';
            $messages["message_items.$key.carousel_products.*.image_path"] = '商品カルーセル画像';
            $messages["message_items.$key.carousel_products.*.uri"] = '商品カルーセルURL';
            $messages["message_items.$key.carousel_products.*.label"] = '商品カルーセルボタン名';
            $messages["message_items.$key.carousel_products.*.text"] = '商品カルーセルテキスト';
            $messages["message_items.$key.carousel_products.*.title"] = '商品カルーセルタイトル';
            $messages['title'] = 'タイトル';
            $messages['is_undisclosed'] = '公開ステータス';
        }
        return $messages;
    }

    protected function prepareForValidation()
    {
        $message_items = $this->message_items;

        if ($message_items) {
            $this->merge(['message_items' => json_decode($this->message_items, true)]);
        }
    }
}
