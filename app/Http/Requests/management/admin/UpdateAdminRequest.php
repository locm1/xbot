<?php

namespace App\Http\Requests\management\admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateAdminRequest extends FormRequest
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
            'is_checked' => 'required|boolean',
            'password_confirmation' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'login_id' => 'ログインID',
            'name' => 'ユーザー名',
            'password' => 'パスワード',
            'role' => '権限レベル',
            'password_confirmation' => '確認用パスワード', 
        ];
    }

    public function withValidator($validator)
    {
        # パスワード変更用バリデーション
        $is_checked = $this->is_checked;

        $password_validate_rules = [
            'password' => ['required', 'confirmed'],
        ];
        foreach ($password_validate_rules as $key => $value) {
            # is_checkがtrueの時、つまりパスワードが変更されているときにバリデーション
            $validator->sometimes($key, $value, function() use($is_checked) {
                return $is_checked;
            });
        }
    }
}
