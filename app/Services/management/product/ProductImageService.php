<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\management\product\SaveStorageProductImageAction;
use Illuminate\Support\Facades\Storage;

class ProductImageService
{
    private $save_storage_product_image_action;

    public function __construct(SaveStorageProductImageAction $save_storage_product_image_action) {
        $this->save_storage_product_image_action = $save_storage_product_image_action;
    }

    public function index($product) 
    {
        return $product->productImages;
    }

    public function store($request, $product)
    {
        $merged_product_images = $this->save_storage_product_image_action->storeFiles($request->file('files'), $product);
        return ProductImage::insert($merged_product_images);
    }

    public function update($request, $product)
    {
        $merged_product_images = $this->save_storage_product_image_action->updateFiles($request, $product);
        return ProductImage::upsert($merged_product_images, ['id'], ['image_path']);
    }

    public function destroy($request)
    {
        ProductImage::whereIn('id', $request->ids)->delete();
        Storage::disk('public')->delete($request->image_paths);
        return $request->image_paths;
    }
}
