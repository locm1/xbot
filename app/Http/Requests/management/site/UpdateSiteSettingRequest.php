<?php

namespace App\Http\Requests\management\site;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UpdateSiteSettingRequest extends FormRequest
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
        Log::debug($this->logo_login_image);
        return [
            'logo_login_image' => 'nullable|max:10240',
            'logo_sidebar_image' => 'nullable|max:10240',
        ];
    }

    public function attributes()
    {
        return [
            'logo_login_image' => 'ログイン画面ロゴ画像',
            'logo_sidebar_image' => 'マイページ・サイドバー画面ロゴ画像',
        ];
    }
}
