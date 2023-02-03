<?php

namespace App\Services\management\category;

use App\Services\management\AbstractManagementService;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ProductCategoryService extends AbstractManagementService 
{

    public function index(): Collection
    {
        return ProductCategory::withCount('products')->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request): ProductCategory
    {
        $attributes = $request->only(['login_id', 'name', 'role', 'password']);
        return ProductCategory::create($attributes);
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
        return $category;
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
