<?php

namespace App\Http\Controllers\api\management\product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\management\product\ProductService;
use App\Http\Requests\management\product\StoreProductRequest;
use App\Http\Requests\management\product\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $product_service;

    public function __construct(ProductService $product_service)
    {
        $this->product_service = $product_service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = $this->product_service->index($request);
        return response()->json(['products' => $products], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $product = $this->product_service->store($request);
        return response()->json(['product' => $product], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product = $this->product_service->show($product);
        return response()->json(['product' => $product], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProductRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        return $this->product_service->update($request, $product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $this->product_service->destroy($product);
        return response()->json([], 204);
    }
}
