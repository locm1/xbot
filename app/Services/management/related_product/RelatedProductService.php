<?php

namespace App\Services\management\related_product;

use App\Models\RelatedProduct;
use App\Services\management\AbstractManagementService;

class RelatedProductService 
{

    public function index() 
    {
        //
    }


    public function store() 
    {
        //
    }


    public function show() 
    {
        //
    }


    public function update() 
    {
        //
    }


    public function destroy() 
    {
        //
    }

    public function upsert($request, $product_id)
    {
        $filtered_request = array_filter($request->all(), fn($v) => $v['id'] != 0);
        $save_data = array_map(fn($v) => [
            'id' => $v['table_id'] ?? null, 
            'product_id' => $product_id, 
            'related_product_id' => $v['id'],
            'discount_price' => $v['discountPrice']
        ], $filtered_request);
        RelatedProduct::upsert($save_data, 'id', ['related_product_id', 'discount_price']);
        return $save_data;
    }

}
