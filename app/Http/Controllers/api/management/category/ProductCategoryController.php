<?php

namespace App\Http\Controllers\api\management\category;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use App\Http\Requests\management\category\StoreProductCategoryRequest;
use App\Http\Requests\management\category\UpdateProductCategoryRequest;
use App\Services\management\category\ProductCategoryService;

class ProductCategoryController extends Controller
{
    private $category_service;

    public function __construct(ProductCategoryService $category_service) {
        $this->category_service = $category_service;
    }

    /**
     * Display a listing of the resource.
     *  @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = $this->category_service->index($request);
        return response()->json(['categories' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductCategoryRequest $request)
    {
        $category = $this->category_service->store($request);
        return response()->json(['category' => $category], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  ProductCategory $category
     * @return \Illuminate\Http\Response
     */
    public function show(ProductCategory $category)
    {
        $category = $this->category_service->show($category);
        return response()->json(['category' => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  ProductCategory  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductCategoryRequest $request, ProductCategory $category)
    {
        $category = $this->category_service->update($request, $category);
        return response()->json(['category' => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  ProductCategory $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductCategory $category)
    {
        $this->category_service->destroy($category);
        return response()->json([], 204);
    }
}
