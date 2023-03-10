<?php

namespace App\Http\Controllers\api\liff\product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\liff\product\ProductService as LiffProductService;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LiffProductService $liff_product_service, Product $product)
    {
        $category = $liff_product_service->getCategoryByProduct($product);
        return response()->json(['category' => $category], 200);
    }
}
