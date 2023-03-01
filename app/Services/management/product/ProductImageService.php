<?php

namespace App\Services\management\product;

use App\Models\Product;
use App\Models\ProductImage;
use App\Services\management\product\FormatProductImageAction;
use Illuminate\Support\Facades\Storage;

class ProductImageService
{
    private $format_product_image_action;

    public function __construct(FormatProductImageAction $format_product_image_action) {
        $this->format_product_image_action = $format_product_image_action;
    }

    public function index($product) 
    {
        return $product->productImages;
    }

    public function store($request, $product)
    {
        return $request->product_images;
        $merged_product_images = $this->format_product_image_action->mergeProductIdToArray($request->product_images, $product);
        return $merged_product_images;
        //return ProductImage::insert($merged_product_images);
    }

    public function destroy($request)
    {
        ProductImage::whereIn('id', $request->ids)->delete();
        Storage::disk('public')->delete($request->image_paths);
        return $request->image_paths;
    }
}
