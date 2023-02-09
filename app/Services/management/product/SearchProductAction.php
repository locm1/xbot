<?php

namespace App\Services\management\product;

use App\Models\Product;

class SearchProductAction
{
    public function search($request)
    {
        $query = Product::query();

        if (isset($request->name)) {
            $this->searchByName($query, $request->name);
        }

        if (isset($request->category)) {
            $this->searchByCategory($query, $request->category);
        }

        return $query->with(['productImages', 'productCategory'])->get();
    }

    private function searchByName($query, $name)
    {
        return $query->where('name', 'like', "%{$name}%");
    }
    
    

    private function searchByCategory($query, $category)
    {
        return $query->where('product_category_id', $category);
    }
}