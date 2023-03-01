<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\management\product\StoreProductImageAction;
use Illuminate\Support\Facades\Storage;

class ProductImageService
{
    private $store_product_image_action;

    public function __construct(StoreProductImageAction $store_product_image_action) {
        $this->store_product_image_action = $store_product_image_action;
    }

    public function index($product) 
    {
        return $product->productImages;
    }

    public function store($request, $product)
    {
        $merged_product_images = $this->store_product_image_action->storeFiles($request->file('files'), $product);
        return ProductImage::insert($merged_product_images);
    }

    public function update($request, $product)
    {
        $merged_product_images = $this->store_product_image_action->updateFiles($request);
        return $merged_product_images;
    }

    public function destroy($request)
    {
        ProductImage::whereIn('id', $request->ids)->delete();
        Storage::disk('public')->delete($request->image_paths);
        return $request->image_paths;
    }
}
