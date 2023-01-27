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
            'data.login_id' => 'required',
            'data.name' => 'required',
            'data.role' => 'required|numeric|between:1,3',
            'is_checked' => 'required|boolean',
        ];
    }

    public function attributes()
    {
        return [
            'data.login_id' => 'ログインID',
            'data.name' => 'ユーザー名',
            'data.password' => 'パスワード',
            'data.role' => '権限レベル',
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
