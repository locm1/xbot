<?php

namespace App\Services\management\message;

use App\Models\MessageItem;
use App\Models\MessageItemCarouselImage;
use App\Models\MessageItemCarouselProduct;
use App\Services\common\CreateThumbnailFileUtility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UpsertMessageItemAction
{
    public function updateFiles($request, $message, $method)
    {
        $message_items = $request->message_items;
        # 更新する画像ファイルがある場合
        $files = isset($request->image_ids) 
            ? $this->storeFiles($request, 'images', $request->image_ids, 'message')
            : $this->copyFiles($method, 'images', 'message', $message_items);
        $videos = isset($request->video_ids) 
            ? $this->storeFiles($request, 'videos', $request->video_ids, 'video') 
            : $this->copyFiles($method, 'videos', 'video', $message_items);
        $carousel_image_image_files = isset($request->carousel_image_image_ids) 
            ? $this->storeCarouselImages($this->getFiles($request, 'carousel_image_images'), $request->carousel_image_image_ids, 'carousel_images') 
            : $this->copyCarouselImages($method, 'carousel_images', $message_items);
        $carousel_product_image_files = isset($request->carousel_product_image_ids) 
            ? $this->storeCarouselImages($this->getFiles($request, 'carousel_product_images'), $request->carousel_product_image_ids, 'carousel_products') 
            : $this->copyCarouselImages($method, 'carousel_products', $message_items);
        
        # 動画が送られてきたら、サムネイルの保存
        $video_thumbnails = isset($request->video_thumbnails) ? CreateThumbnailFileUtility::getThumbnailFiles($request->video_thumbnails, $request->video_ids, 'message_video_thumbnail') : null;

        foreach ($message_items as $message_item) {
            if ($carousel_image_image_files) {
                foreach ($carousel_image_image_files as $k => $v) {
                    if ($v['message_item_display_id'] == $message_item['display_id']) {
                        $search_carousel_image_image_files[] = $v;
                    }
                }
            }
            if ($carousel_product_image_files) {
                foreach ($carousel_product_image_files as $k => $v) {
                    if ($v['message_item_display_id'] == $message_item['display_id']) {
                        $search_carousel_product_image_files[] = $v;
                    }
                }
            }
            
            if (isset($message_item['current_image_path'])) {
                $this->deleteFile('message', $message_item['current_image_path']);
            }

            if (isset($message_item['current_video_path'])) {
                $this->deleteFile('video', $message_item['current_video_path']);
            }

            $image_file_name = isset($files)
                ? array_reduce(array_filter($files, function($file) use($message_item) { return $file['id'] == $message_item['display_id'];}), 'array_merge', array())
                : $message_item['image_path'];

            $video_file_name = isset($videos)
                ? array_reduce(array_filter($videos, function($video) use($message_item) { return $video['id'] == $message_item['display_id'];}), 'array_merge', array())
                : $message_item['video_path'];

            $video_thumbnail_file_name = isset($video_thumbnails)
                ? array_reduce(array_filter($video_thumbnails, function($video_thumbnail) use($message_item) { return $video_thumbnail['id'] == $message_item['display_id'];}), 'array_merge', array())
                : $message_item['thumbnail_path'];
            
            $message_item_id = ($method == 'update') ? $message_item['id'] : null;
            
            $data = [
                'message_id' => $message->id,
                'type' => $message_item['type'],
                'text' => $message_item['text'],
                'image_path' => isset($image_file_name['file_name']) ? $image_file_name['file_name'] : $message_item['image_path'],
                'video_path' => isset($video_file_name['file_name']) ? $video_file_name['file_name'] : $message_item['video_path'],
                'thumbnail_path' => isset($video_thumbnail_file_name['file_name']) ? $video_thumbnail_file_name['file_name'] : $message_item['thumbnail_path'],
            ];

            # message_item_idがあった場合、update_dataの配列に格納、なければその場でcreateしidを取得
            $message_item_id ? $update_data[] = ($data += ['id' => $message_item_id]) : $message_item_id = MessageItem::create($data)->id;

            # タイプ別にカルーセルをupsert
            if ($message_item['type'] == 4) {
                $this->upsertCarouselImages($message_item['carousel_images'], $message_item_id, $search_carousel_image_image_files ?? null);
            } else if ($message_item['type'] == 5) {
                $this->upsertCarouselProducts($message_item['carousel_products'], $message_item_id, $search_carousel_product_image_files ?? null);
            }
        }
        if ($update_data ?? false) { 
            return MessageItem::upsert($update_data, 'id');
        } 
        return $data;
    }

    private function storeFiles($request, $file_path, $ids, $path)
    {
        # 画像を削除しストレージに保存
        $files = array();
        foreach (array_map(null, $request->file($file_path), $ids) as [$file, $id]) {
            $uuid = (string)Str::uuid();
            $file_name = $uuid .'_' .$file->getClientOriginalName();
            $file->storeAs("public/$path", $file_name);

            $files[] = [
                'id' => $id,
                'file_name' => "/storage/$path/$file_name"
            ];
        }
        return $files;
    }

    private function copyFiles(String $method, String $file_path, String $path, array $message_items): ?array
    {
        $files = array();
        
        // メソッドがUpdateならNullを返す
        if ($method === 'update') {
            return null;
        }

        foreach ($message_items as $message_item) {
            $current_message_item = MessageItem::find($message_item['id']);

            //DBに保存されているPathと比較し、同じならコピー
            $current_file_path = $file_path == 'images' ? $current_message_item->image_path : $current_message_item->video_path;
            $file_name = basename($current_file_path);
            $replace_current_file_path = str_replace("/storage/$path", $path, $current_file_path);
            $copy_file_path = $path .'/' .$current_message_item->id .'_' .$file_name;
            Storage::disk('public')->copy($replace_current_file_path, $copy_file_path);

            $files[] = [
                'id' => $current_message_item->id,
                'file_name' => !empty($file_name) ? "/storage/$path/$current_message_item->id" . '_' .$file_name : null
            ];
        }

        return $files;
    }

    private function storeCarouselImages($files, $ids, $path)
    {
        $combine_data = array_combine($ids, $files);
        foreach ($combine_data as $k => $v) {
            $file_name = $v->getClientOriginalName() .'_' .$k;
            $v->storeAs("public/$path", $file_name);
            $display_ids = explode('-', $k);
            $format_files[] = [
                'message_item_display_id' => $display_ids[0],
                'carousel_display_id' => $display_ids[1],
                'image_path' => "/storage/$path/$file_name"
            ];
        }
        return $format_files;
    }

    private function copyCarouselImages(String $method, String $path, array $message_items): ?array
    {
        $files = array();
        
        // メソッドがUpdateならNullを返す
        if ($method === 'update') {
            return null;
        }

        foreach ($message_items as $message_item) {
            foreach ($message_item[$path] as $carousel_image) {
                $current_file_path = $carousel_image['image_path'];
                $file_name = basename($current_file_path);
                $replace_current_file_path = str_replace("/storage/$path", $path, $current_file_path);

                if (!isset($carousel_image['message_item_id'])) {
                    return null;
                }

                $copy_file_path = $path .'/' .$carousel_image['display_id'] .'_' .$file_name;
                Storage::disk('public')->copy($replace_current_file_path, $copy_file_path);

                $files[] = [
                    'message_item_display_id' => $carousel_image['message_item_id'],
                    'carousel_display_id' => $carousel_image['display_id'],
                    'image_path' => "/storage/$path/" .$carousel_image['display_id'] . '_' .$file_name
                ];
            }
        }

        return $files;
    }

    public function deleteFile($path, $current_path)
    {
        $delete_file_path = str_replace("/storage/$path", $path, $current_path);
        return Storage::disk('public')->delete($delete_file_path);
    }
    
    private function upsertCarouselImages($carousel_images, $message_item_id, $search_carousel_image_image_files = null)
    {
        $message_item_carousel_image_data = [];
        foreach ($carousel_images as $k => $v) {
            if ($v['is_deleted'] === false) {
                if ($search_carousel_image_image_files) {
                    foreach ($search_carousel_image_image_files as $k => $b) {
                        Log::debug($b);
                        $image_path = $b['carousel_display_id'] == $v['display_id'] ? $b['image_path'] : null;
                        if ($image_path) break;
                    }
                }
                $message_item_carousel_image_data[] = [
                    'id' => $v['id'] ?? null,
                    'image_path' => $image_path ?? $v['image_path'],
                    'message_item_id' => $message_item_id,
                    'label' => $v['label'],
                    'uri' => $v['uri']
                ];
            } else {
                $delete_item_carousel_image_ids[] = $v['id'];
            }
        }
        MessageItemCarouselImage::upsert($message_item_carousel_image_data, ['id']);
        if ($delete_item_carousel_image_ids ?? false) {
            MessageItemCarouselImage::whereIn('id', $delete_item_carousel_image_ids)->delete();
        }
    }

    private function upsertCarouselProducts($carousel_products, $message_item_id, $search_carousel_product_image_files = null)
    {
        $message_item_carousel_product_data = [];
        foreach ($carousel_products as $k => $v) {
            if ($v['is_deleted'] === false) {
                if ($search_carousel_product_image_files) {
                    foreach ($search_carousel_product_image_files as $k => $b) {
                        $image_path = $b['carousel_display_id'] == $v['display_id'] ? $b['image_path'] : null;
                        if ($image_path) break;
                    }
                }
                $message_item_carousel_product_data[] = [
                    'id' => $v['id'] ?? null,
                    'title' => $v['title'],
                    'text' => $v['text'],
                    'image_path' => $image_path ?? $v['image_path'],
                    'message_item_id' => $message_item_id,
                    'label' => $v['label'],
                    'uri' => $v['uri']
                ];
            } else {
                $delete_item_carousel_product_ids[] = $v['id'];
            }
        }
        MessageItemCarouselProduct::upsert($message_item_carousel_product_data, 'id');
        if ($delete_item_carousel_product_ids ?? false) {
            MessageItemCarouselProduct::whereIn('id', $delete_item_carousel_product_ids)->delete();
        }
    }

    private function getFiles(Request $request, string $name): array
    {
        foreach ($request->file($name) as $k => $v) {
            $files[] = $v;
        }
        return $files;
    }
}
