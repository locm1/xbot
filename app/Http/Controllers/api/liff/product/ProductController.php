<?php

namespace App\Http\Controllers\api\liff\product;

use App\Http\Controllers\Controller;
use App\Services\management\product\ProductService;
use App\Services\liff\product\ProductService as LiffProductService;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    private $product_service;
    private $liff_product_service;

    public function __construct(ProductService $product_service, LiffProductService $liff_product_service)
    {
        $this->product_service = $product_service;
        $this->liff_product_service = $liff_product_service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = $this->liff_product_service->index();
        return response()->json(['products' => $products], 200);
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
}
