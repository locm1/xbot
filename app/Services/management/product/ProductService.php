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
        if ($request->no_paginate) return Product::all();
        return Product::with(['productImages', 'productCategory'])->paginate(10);
    }


    public function store($request) 
    {
        $data = $request->only([
            'name', 'product_category_id', 'stock_quantity', 'tax_rate', 
            'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
        ]);
        $product_sale_data = $request->only(['discount_rate', 'start_date', 'end_date']);

        return DB::transaction(function () use ($data, $product_sale_data) {
            $product = Product::create($data);
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
            'name', 'product_category_id', 'stock_quantity', 'tax_rate', 
            'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
        ]);
        $product_sale_update_data = $request->only(['product_id', 'discount_rate', 'start_date', 'end_date']);

        return DB::transaction(function () use ($product, $product_update_data, $product_sale_update_data) {
            $product->update($product_update_data);
            $product->productSale()->update($product_sale_update_data);
            return $product;
        });
    }


    public function destroy($model) 
    {
        //
    }

}
