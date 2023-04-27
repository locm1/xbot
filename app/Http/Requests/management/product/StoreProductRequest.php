<?php

namespace App\Http\Requests\management\product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'overview' => 'required',
            'price' => 'required|numeric',
            'product_category_id' => 'required|numeric|exists:product_categories,id',
            'is_picked_up' => 'required|boolean',
            'is_undisclosed' => 'required|boolean',
            'is_unlimited' => 'required|boolean',
            'discount_rate' => 'nullable|numeric|between:0,100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '商品名',
            'overview' => '商品概要',
            'price' => '販売価格（税込）',
            'stock_quantity' => '在庫数',
            'product_category_id' => 'カテゴリーID',
            'is_picked_up' => 'ピックアップ商品',
            'is_undisclosed' => '公開ステータス',
            'is_unlimited' => '在庫数無制限',
            'discount_rate' => 'セール割引率',
            'start_date' => '開始日時',
            'end_date' => '終了日時',
        ];
    }

    public function withValidator($validator)
    {
        # パスワード変更用バリデーション
        $is_unlimited = $this->is_unlimited;

        $validate_rules = [
            'stock_quantity' => ['required', 'numeric'],
        ];
        foreach ($validate_rules as $key => $value) {
            # 在庫数が無制限にチェックしていない場合にバリデーション
            $validator->sometimes($key, $value, function() use($is_unlimited) {
                return $is_unlimited == 0;
            });
        }
    }
}
