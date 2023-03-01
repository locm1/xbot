<?php

namespace App\Http\Controllers\api\management\product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Services\management\product\ProductImageService;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    private $product_image_service;

    public function __construct(ProductImageService $ProductImageService)
    {
        $this->product_image_service = $ProductImageService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        $product_images = $this->product_image_service->index($product);
        return response()->json(['product_images' => $product_images], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        return $request;
        $product_image = $this->product_image_service->store($request, $product);
        return response()->json(['product_image' => $product_image], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->product_image_service->destroy($request);
        return response()->json([], 204);
    }
}
