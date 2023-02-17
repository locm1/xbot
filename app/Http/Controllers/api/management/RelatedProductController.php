<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\RelatedProduct;
use App\Services\management\related_product\RelatedProductService;
use Illuminate\Http\Request;

class RelatedProductController extends Controller
{
    private $related_service;

    public function __construct(RelatedProductService $related_service) {
        $this->related_service = $related_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return ['related_products' => $product->relatedProducts()->with('relatedProduct')->get()];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $product_id)
    {
        return $this->related_service->upsert($request, $product_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $product_id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
