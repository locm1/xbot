<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductService
{
    private $search_product_action;
    private $service;

    public function __construct(SearchProductAction $search_product_action, ProductImageService $service)
    {
        $this->search_product_action = $search_product_action;
        $this->service = $service;
    }

    public function index($request) 
    {
        if (isset($request->name) || isset($request->category)) {
            return $this->search_product_action->search($request);
        }
        if ($request->no_paginate) return Product::all();
        return Product::with(['productImages', 'productCategory'])->orderBy('id', 'desc')->paginate(10);
    }


    public function store($request) 
    {
        $data = $request->only([
            'name', 'product_category_id', 'stock_quantity', 'tax_rate', 
            'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
        ]);
        $product_sale_data = $request->only(['discount_rate', 'start_date', 'end_date']);

        return DB::transaction(function () use ($request, $data, $product_sale_data) {
            $product = Product::create($data);
            $product->productSale()->create($product_sale_data);

            // 画像のインサート
            if ($request->file('files')) {
                $this->service->store($request, $product);
            }

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
        return DB::transaction(function () use ($request, $product) {
            $product_update_data = $request->only([
                'name', 'product_category_id', 'stock_quantity', 'tax_rate', 
                'price', 'overview', 'is_undisclosed', 'is_unlimited', 'is_picked_up'
            ]);
            $product_sale_update_data = $request->only(['product_id', 'discount_rate', 'start_date', 'end_date']);

            $product->update($product_update_data);
            $product->productSale()->update($product_sale_update_data);
            
            // 画像削除
            if (isset($request->ids) && isset($request->image_paths)) {
                $this->service->destroy($request);
            }

            // 画像のアップデート
            if ($request->file('update_files') && isset($request->product_image_ids)) {
                $this->service->update($request, $product);
            }

            // 画像のインサート
            if ($request->file('files')) {
                $this->service->store($request, $product);
            }
            
            return $product;
        });
    }


    public function destroy(Product $product) 
    {
        return DB::transaction(function () use ($product) {
            $product->productSale()->delete();
            $product->productImages()->delete();
            return $product->delete();
        });
    }

}
