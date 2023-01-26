<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AdminUpdateRequest extends FormRequest
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
            'is_check' => 'required|boolean'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'ユーザー名',
            'role' => '権限レベル',
            'is_check'
        ];
    }

    public function withValidator($validator)
    {
        # パスワード変更用バリデーション
        $is_check = $this->is_check;

        $password_validate_rules = [
            'password' => ['required', 'confirmed'],
        ];
        foreach ($password_validate_rules as $key => $value) {
            # is_checkがtrueの時、つまりパスワードが変更されているときにバリデーション
            $validator->sometimes($key, $value, function() use($is_check) {
                return $is_check;
            });
        }
    }
}
