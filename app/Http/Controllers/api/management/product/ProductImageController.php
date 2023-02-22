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
}
