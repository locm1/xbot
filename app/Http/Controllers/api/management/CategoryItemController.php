<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use App\Services\management\category\ProductCategoryItemService;

class CategoryItemController extends Controller
{
    private $category_item_service;

    public function __construct(ProductCategoryItemService $category_item_service) {
        $this->category_item_service = $category_item_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProductCategory $category)
    {
        $category_items = $this->category_item_service->index($category);
        return response()->json(['categoryItems' => $category_items], 200);
    }
}
