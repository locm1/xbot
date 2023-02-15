<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Services\management\product\SearchProductAction;

class ProductService
{
    private $search_product_action;

    public function __construct(SearchProductAction $search_product_action)
    {
        $this->search_product_action = $search_product_action;
    }

    public function index($request) 
    {
        if ($request) {
            return $this->search_product_action->search($request);
        }
        return Product::with(['productImages', 'productCategory'])->get();
    }


    public function store($request) 
    {
        //
    }


    /**
     * Display the specified resource.
     *
     * @param  Product $product
     * @return Product
     */
    public function show(Product $product): Product
    {
        return $product::with('productImages')->find($product->id);
    }


    public function update($request, $product) 
    {
        return $product->update($request->only(
            'name', 'product_category_id', 'stock_quantity', 'tax_rate', 'price', 'overview', 'is_undisclosed', 'is_unlimited'
        ));
    }


    public function destroy($model) 
    {
        //
    }

}
