<?php

namespace App\Http\Requests\management\specific_trade;

use Illuminate\Foundation\Http\FormRequest;

class CreateSpecificTradeRequest extends FormRequest
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
            'specific_trades' => 'required|array',
            'specific_trades.*.title' => 'required',
            'specific_trades.*.content' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'specific_trades.*.title' => 'タイトル',
            'specific_trades.*.content' => '内容',
        ];
    }
}
