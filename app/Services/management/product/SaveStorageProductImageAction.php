<?php

namespace App\Services\management\product;
use Illuminate\Support\Facades\Storage;

class SaveStorageProductImageAction
{

    public function storeFiles($files, $product)
    {
        $merged_product_images = array();

        foreach ($files as $file) {
            $file_name = $file->getClientOriginalName();

            # 画像をストレージに保存
            $file->storeAs('public/products', $file_name);
            $merged_product_images[] = [
                'product_id' => $product->id,
                'image_path' => '/storage/products/' .$file_name,
                'created_at' => date('Y-m-d H:i:s')
            ];
        }
        return $merged_product_images;
    }


    public function updateFiles($request, $product)
    {
        $merged_product_images = array();

        foreach (array_map(null, $request->file('files'), $request->product_image_ids) as [$file, $id]) {
            # 画像を削除しストレージに保存
            $file_name = $file->getClientOriginalName();
            Storage::disk('public')->delete("products/$file_name");
            $file->storeAs('public/products', $file_name);

            $merged_product_images[] = [
                'id' => $id,
                'product_id' => $product->id,
                'image_path' => '/storage/products/' .$file_name,
            ];
        }
        return $merged_product_images;
    }
}
