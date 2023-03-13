<?php

namespace App\Http\Controllers\api\liff\product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\management\product\ProductImageService;

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
}
