<?php

namespace App\Http\Controllers\api\management\category;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use App\Services\management\category\ProductCategorySortService;

class ProductCategorySortController extends Controller
{
    private $category_sort_service;

    public function __construct(ProductCategorySortService $category_sort_service) {
        $this->category_sort_service = $category_sort_service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, ProductCategory $category)
    {
        $display_order = $this->category_sort_service->sort($request, $category);
        return response()->json(['display_order' => $display_order], 200);
    }
}
