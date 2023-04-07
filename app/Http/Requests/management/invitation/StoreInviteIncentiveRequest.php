<?php

namespace App\Http\Requests\management\invitation;

use Illuminate\Foundation\Http\FormRequest;

class StoreInviteIncentiveRequest extends FormRequest
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
            'name' => 'required', 
            'inviter_timing' => 'required', 
            'inviter_format' => 'required|numeric|between:1,4', 
            'inviter_title' => 'required', 
            'inviter_content' => 'required', 
            'invitee_timing' => 'required|numeric|between:1,4', 
            'invitee_format' => 'required|numeric|between:1,4', 
            'invitee_title' => 'required', 
            'invitee_content' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'name' => '管理名称', 
            'inviter_timing' => 'スピーカー付与タイミング', 
            'inviter_format' => 'スピーカー形式', 
            'inviter_title' => 'スピーカーインセンティブ名', 
            'inviter_content' => 'スピーカーインセンティブ説明', 
            'invitee_timing' => '招待者付与タイミング', 
            'invitee_format' => '招待者形式', 
            'invitee_title' => '招待者インセンティブ名', 
            'invitee_content' => '招待者インセンティブ説明'
        ];
    }
}
