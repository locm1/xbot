<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\DB;

class ProductService
{
    private $search_product_action;

    public function __construct(SearchProductAction $search_product_action)
    {
        $this->search_product_action = $search_product_action;
    }

    public function index($request) 
    {
        if (isset($request->name) || isset($request->category)) {
            return $this->search_product_action->search($request);
        }
        return Product::with(['productImages', 'productCategory'])->paginate(10);
    }


    public function store($request) 
    {
        $data = $request->only([
            'name', 'product_category_id', 'stock_quantity', 'tax_rate', 
            'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
        ]);
        $product_sale_data = $request->only(['discount_rate', 'start_date', 'end_date']);
        $stock_quantity = ($request->is_unlimited == 1) ? 999999 : $request->stock_quantity;
        $merged_data = array_merge($data, ['stock_quantity' => $stock_quantity]);

        return DB::transaction(function () use ($merged_data, $product_sale_data) {
            $product = Product::create($merged_data);
            $product->productSale()->create($product_sale_data);
            return $product;
        });
    }


    /**
     * Display the specified resource.
     *
     * @param  Product $product
     * @return Product
     */
    public function show(Product $product): Product
    {
        return Product::with('productSale')->find($product->id);
    }


    public function update($request, $product) 
    {
        $product_update_data = $request->only([
            'name', 'product_category_id', 'tax_rate', 
            'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
        ]);
        $product_sale_update_data = $request->only(['product_id', 'discount_rate', 'start_date', 'end_date']);
        $stock_quantity = ($request->is_unlimited == 1) ? 999999 : $request->stock_quantity;
        $merged_product_update_data = array_merge($product_update_data, ['stock_quantity' => $stock_quantity]);

        return DB::transaction(function () use ($product, $merged_product_update_data, $product_sale_update_data) {
            $product->update($merged_product_update_data);
            $product->productSale()->update($product_sale_update_data);
            return $product;
        });
    }


    public function destroy($model) 
    {
        //
    }

}
