<?php

namespace App\Http\Requests\management\richmenu;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UpdateRichmenuRequest extends FormRequest
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
            'menuBarText' => 'required',
            'title' => 'required',
            'menuType' => 'required|numeric|between:1,7',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            foreach ($this->request->all() as $key => $value) {
                if (strpos($key, '-type') !== false && $value == 1) {
                    $value_key = str_replace('-type', '-value', $key);
                    $value = $this->request->get($value_key);

                    if (strpos($value, 'external=1') !== false) {
                        $parsed_url = parse_url($value);
                        $query = isset($parsed_url['query']) ? $parsed_url['query'] : '';
                        parse_str($query, $query_parameters);
    
                        $path = isset($query_parameters['path']) ? $query_parameters['path'] : '';
    
                        if (!preg_match('/^(https?:\/\/)/', $path)) {
                            $validator->errors()->add($value_key, 'LINE内ブラウザはURLの形式で入力してください。');
                        } else if (empty($path)) {
                            $validator->errors()->add($value_key, 'LINE内ブラウザを入力してください。');
                        }
                    }

                    if (empty($value)) {
                        $validator->errors()->add($value_key, 'LINE内ブラウザを入力してください。');
                    }

                } else if (strpos($key, '-type') !== false && $value == 2) {
                    $value_key = str_replace('-type', '-value', $key);
                    $value = $this->request->get($value_key);

                    if (empty($value)) {
                        $validator->errors()->add($value_key, '送信テキストを入力してください。');
                    }
                } else if (strpos($key, '-type') !== false && $value == 3) {
                    $value_key = str_replace('-type', '-value', $key);
                    $value = $this->request->get($value_key);

                    if (empty($value)) {
                        $validator->errors()->add($value_key, 'リッチメニューを選択してください');
                    }
                } else if (strpos($key, '-type') !== false && $value == 0) {
                    $value_key = str_replace('-type', '-value', $key);
                    Log::debug($key);
                    $validator->errors()->add($key, 'アクションを選択してください');
                }
            }
        });
    }

    public function attributes()
    {
        return [
            'menuBarText' => 'メニューバーテキスト',
            'title' => 'タイトル',
            'menuType' => 'テンプレート',
            'A-value' => 'LINE内ブラウザ'
        ];
    }
}
