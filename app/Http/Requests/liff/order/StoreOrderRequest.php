<?php

namespace App\Http\Requests\liff\order;

use App\Services\liff\product\FormatProductAction;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            //
        ];
    }

    public function withValidator($validator)
    {
        $order_products = $this->order_products;
        $format_product_action = new FormatProductAction();
        $update_products = $format_product_action->createBulkUpdateArray($order_products);
    }
}
