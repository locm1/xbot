<?php

namespace App\Http\Requests\management\site;

use Illuminate\Foundation\Http\FormRequest;

class StoreSiteSettingRequest extends FormRequest
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
        $logo_login_image_rule = $this->hasFile('logo_login_image') 
            ? 'image|mimes:jpeg,png,jpg|max:10240'
            : 'nullable|max:10240'; 
        $logo_sidebar_image_rule = $this->hasFile('logo_sidebar_image') 
            ? 'image|mimes:jpeg,png,jpg|max:10240'
            : 'nullable|max:10240'; 
        return [
            'logo_login_image' => $logo_login_image_rule,
            'logo_sidebar_image' => $logo_sidebar_image_rule,
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
