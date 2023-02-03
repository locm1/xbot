<?php

namespace App\Services\management\category;

use App\Services\management\AbstractManagementService;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Services\management\category\FormatProductCategoryAction;

class ProductCategoryService
{

    private $format_category_action;

    public function __construct(FormatProductCategoryAction $format_category_action)
    {
        $this->format_category_action = $format_category_action;
    }

    public function index($request): Collection
    {
        if ($request->name) {
            return ProductCategory::where('name', 'like', "%{$request->name}%")->withCount('products')->orderBy('display_order', 'asc')->get();
        }
        return ProductCategory::withCount('products')->orderBy('display_order', 'asc')->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request): ProductCategory
    {
        $attributes = $request->only(['name', 'color', 'content', 'is_undisclosed']);
        $data = $this->format_category_action->mergeDisplayOrderToArray($attributes);
        return ProductCategory::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  ProductCategory $category
     * @return ProductCategory
     */
    public function show(Model $category): ProductCategory
    {
        return $category;
    }


    public function update($request, $category)
    {
        $data = $request->only(['name', 'color', 'content', 'is_undisclosed']);
        $category->update($data);
        return $data;
    }

    /**
     * Delete the specified resource.
     *
     * @param  ProductCategory $category
     */
    public function destroy($category)
    {
        return $category->delete();
    }

}
