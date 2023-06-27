<?php

namespace App\Http\Requests\management\richmenu;

use Illuminate\Foundation\Http\FormRequest;

class StoreRichmenuRequest extends FormRequest
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
            'A-value' => 'required|url'
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
                        }
                    }
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
