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
            'stock_quantity' => 'required|numeric',
            'tax_rate' => 'required|numeric',
            'product_category_id' => 'required|numeric|exists:product_categories,id',
            'is_picked_up' => 'required|boolean',
            'is_undisclosed' => 'required|boolean',
            'is_unlimited' => 'required|boolean',
        ];
    }

    public function attributes()
    {
        return [
            'name' => '商品名',
            'overview' => '商品概要',
            'price' => '販売価格（税込）',
            'stock_quantity' => '在庫数',
            'tax_rate' => '税率（％）',
            'product_category_id' => 'カテゴリーID',
            'is_picked_up' => 'ピックアップ商品',
            'is_undisclosed' => '公開ステータス',
            'is_unlimited' => '在庫数無制限',
        ];
    }
}
